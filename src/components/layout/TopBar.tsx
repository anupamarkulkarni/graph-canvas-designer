import { ChevronDown, MoreHorizontal, Share2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';

export const TopBar = () => {
  const { data: apps, isLoading } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();

  const selectedApp = apps?.find((app) => app.id === selectedAppId);

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-md flex items-center justify-center">
          <span className="text-primary font-bold text-sm">/</span>
        </div>

        {/* App selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-9 px-3 bg-secondary hover:bg-accent"
              disabled={isLoading}
            >
              <span className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center text-xs">
                {selectedApp?.icon || '🔐'}
              </span>
              <span className="text-sm font-medium">
                {isLoading ? 'Loading...' : selectedApp?.name || 'Select App'}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {apps?.map((app) => (
              <DropdownMenuItem
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className="flex items-center gap-2"
              >
                <span>{app.icon}</span>
                <span>{app.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs font-bold">
          A
        </div>
      </div>
    </header>
  );
};
