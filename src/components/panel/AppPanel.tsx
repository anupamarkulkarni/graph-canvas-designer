import { Search, Plus, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { getAppIcon } from '@/components/icons/ServiceIcons';
import { useEffect, useRef } from 'react';

export const AppPanel = () => {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId, isAppPanelOpen, setAppPanelOpen } = useAppStore();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if click was on the toggle button
        const target = event.target as HTMLElement;
        if (target.closest('[data-app-selector]')) return;
        setAppPanelOpen(false);
      }
    };

    if (isAppPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAppPanelOpen, setAppPanelOpen]);

  if (!isAppPanelOpen) return null;

  if (error) {
    return (
      <div ref={panelRef} className="absolute top-2 left-14 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 p-4">
        <p className="text-destructive text-sm">Failed to load apps</p>
      </div>
    );
  }

  return (
    <div 
      ref={panelRef}
      className="absolute top-2 left-14 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Application</h2>

        {/* Search + Add */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <Button size="icon" className="shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Apps list */}
        <div className="space-y-1">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))
          ) : (
            apps?.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
                  selectedAppId === app.id
                    ? 'bg-accent text-foreground'
                    : 'hover:bg-accent/50 text-muted-foreground'
                )}
              >
                {getAppIcon(app.name)}
                <span className="flex-1 text-sm font-medium truncate">{app.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
