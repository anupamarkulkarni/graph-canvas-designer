import { PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { RightPanel } from '@/components/panel/RightPanel';
import { Canvas } from '@/components/canvas/Canvas';
import { useAppStore } from '@/store/appStore';

const Index = () => {
  const { toggleMobilePanel } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Rail */}
        <LeftRail />

        {/* Canvas */}
        <Canvas />

        {/* Right Panel - Desktop */}
        <RightPanel />

        {/* Right Panel - Mobile Drawer */}
        <RightPanel isMobile />
      </div>

      {/* Mobile Panel Toggle */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 lg:hidden z-30 shadow-lg"
        onClick={toggleMobilePanel}
      >
        <PanelRightOpen className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Index;
