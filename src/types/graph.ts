export type NodeStatus = 'healthy' | 'degraded' | 'down';

export interface App {
  id: string;
  name: string;
  icon: string;
}

export interface ServiceNodeData {
  [key: string]: unknown;
  label: string;
  type: 'database' | 'service' | 'cache';
  status: NodeStatus;
  pricing: string;
  cpu: number;
  memory: string;
  disk: string;
  region: number;
  sliderValue: number;
  description?: string;
}

export interface GraphData {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: ServiceNodeData;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}
