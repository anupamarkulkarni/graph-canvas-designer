import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NodeInspector } from './NodeInspector';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

export const NodeInspectorDrawer = () => {
  const { isMobilePanelOpen, setMobilePanelOpen, selectedNodeId } = useAppStore();

  if (!selectedNodeId) return null;

  return (
    <>
      {/* Desktop - Slide-in panel */}
      <aside className="hidden lg:block w-80 bg-card border-l border-border overflow-y-auto animate-slide-in-right">
        <NodeInspector />
      </aside>

      {/* Mobile - Overlay drawer */}
      <>
        {/* Overlay */}
        {isMobilePanelOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobilePanelOpen(false)}
          />
        )}

        {/* Drawer */}
        <aside
          className={cn(
            'fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto',
            isMobilePanelOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold">Node Inspector</h2>
            <Button variant="ghost" size="icon" onClick={() => setMobilePanelOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <NodeInspector />
        </aside>
      </>
    </>
  );
};
