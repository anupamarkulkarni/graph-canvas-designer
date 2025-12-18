import { ChevronDown, ChevronUp, MoreHorizontal, Share2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';

export const TopBar = () => {
  const { data: apps, isLoading } = useApps();
  const { selectedAppId, isAppPanelOpen, toggleAppPanel } = useAppStore();

  const selectedApp = apps?.find((app) => app.id === selectedAppId);

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-muted to-muted/50 rounded-md flex items-center justify-center border border-border">
          <span className="text-muted-foreground font-bold text-lg">/</span>
        </div>

        {/* App selector button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-9 px-3 bg-secondary hover:bg-accent"
          disabled={isLoading}
          onClick={toggleAppPanel}
          data-app-selector
        >
          <span className="w-5 h-5 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">🔐</span>
          </span>
          <span className="text-sm font-medium">
            {isLoading ? 'Loading...' : selectedApp?.name || 'Select App'}
          </span>
          {isAppPanelOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Moon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="w-4 h-4" />
        </Button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
};
