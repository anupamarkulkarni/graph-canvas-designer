import { PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { Canvas } from '@/components/canvas/Canvas';
import { AppPanel } from '@/components/panel/AppPanel';
import { NodeInspectorDrawer } from '@/components/panel/NodeInspectorDrawer';
import { useAppStore } from '@/store/appStore';

const Index = () => {
  const { selectedNodeId, toggleMobilePanel } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Rail */}
        <LeftRail />

        {/* Canvas - Full width */}
        <Canvas />

        {/* Floating App Panel */}
        <AppPanel />

        {/* Node Inspector Drawer - shows when node selected */}
        <NodeInspectorDrawer />
      </div>

      {/* Mobile Panel Toggle - only shows when node selected on mobile */}
      {selectedNodeId && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 lg:hidden z-30 shadow-lg"
          onClick={toggleMobilePanel}
        >
          <PanelRightOpen className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;
