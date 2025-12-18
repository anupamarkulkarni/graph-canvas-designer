import { create } from 'zustand';

export type InspectorTab = 'config' | 'runtime';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  isAppPanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  
  // Actions
  setSelectedAppId: (appId: string | null) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setAppPanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  toggleMobilePanel: () => void;
  toggleAppPanel: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: 'app-1',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  isAppPanelOpen: true,
  activeInspectorTab: 'config',

  setSelectedAppId: (appId) => set({ selectedAppId: appId, selectedNodeId: null }),
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setAppPanelOpen: (open) => set({ isAppPanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  toggleMobilePanel: () => set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),
  toggleAppPanel: () => set((state) => ({ isAppPanelOpen: !state.isAppPanelOpen })),
}));
