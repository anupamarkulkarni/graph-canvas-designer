import { Search, Plus, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { getAppIcon } from '@/components/icons/ServiceIcons';

export const AppsList = () => {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-destructive text-sm">Failed to load apps</p>
      </div>
    );
  }

  return (
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
  );
};
