import { Github, Layers, Box, Leaf, Database, LayoutGrid, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Github, label: 'GitHub', active: false },
  { icon: Layers, label: 'Layers', active: true },
  { icon: Box, label: 'Services', active: false },
  { icon: Leaf, label: 'Logs', active: false },
  { icon: Database, label: 'Database', active: false },
  { icon: LayoutGrid, label: 'Grid', active: false },
  { icon: GitBranch, label: 'Branches', active: false },
];

export const LeftRail = () => {
  return (
    <aside className="w-14 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
            item.active
              ? 'bg-sidebar-accent text-sidebar-primary'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </aside>
  );
};
