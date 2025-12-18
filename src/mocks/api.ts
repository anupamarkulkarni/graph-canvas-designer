import type { App, GraphData } from '@/types/graph';

// Simulated delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const apps: App[] = [
  { id: 'app-1', name: 'supertokens-golang', icon: '🔐' },
  { id: 'app-2', name: 'supertokens-java', icon: '⚙️' },
  { id: 'app-3', name: 'supertokens-python', icon: '🐍' },
  { id: 'app-4', name: 'supertokens-ruby', icon: '💎' },
  { id: 'app-5', name: 'supertokens-go', icon: '🚀' },
];

const graphDataByApp: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      {
        id: 'node-0',
        type: 'serviceNode',
        position: { x: 80, y: -80 },
        data: {
          label: 'Gateway',
          type: 'service',
          status: 'healthy',
          pricing: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          sliderValue: 50,
          description: 'API Gateway service',
        },
      },
      {
        id: 'node-1',
        type: 'serviceNode',
        position: { x: 520, y: 30 },
        data: {
          label: 'Postgres',
          type: 'database',
          status: 'healthy',
          pricing: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          sliderValue: 65,
          description: 'Primary PostgreSQL database',
        },
      },
      {
        id: 'node-2',
        type: 'serviceNode',
        position: { x: 80, y: 280 },
        data: {
          label: 'Redis',
          type: 'cache',
          status: 'down',
          pricing: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          sliderValue: 45,
          description: 'Redis cache layer',
        },
      },
      {
        id: 'node-3',
        type: 'serviceNode',
        position: { x: 580, y: 320 },
        data: {
          label: 'MongoDB',
          type: 'database',
          status: 'down',
          pricing: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          sliderValue: 80,
          description: 'Document store',
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-3' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
  },
  'app-2': {
    nodes: [
      {
        id: 'node-1',
        type: 'serviceNode',
        position: { x: 200, y: 150 },
        data: {
          label: 'MySQL',
          type: 'database',
          status: 'healthy',
          pricing: '$0.05/HR',
          cpu: 0.04,
          memory: '0.1 GB',
          disk: '20.00 GB',
          region: 2,
          sliderValue: 50,
        },
      },
      {
        id: 'node-2',
        type: 'serviceNode',
        position: { x: 450, y: 150 },
        data: {
          label: 'Memcached',
          type: 'cache',
          status: 'degraded',
          pricing: '$0.02/HR',
          cpu: 0.01,
          memory: '0.02 GB',
          disk: '5.00 GB',
          region: 2,
          sliderValue: 30,
        },
      },
      {
        id: 'node-3',
        type: 'serviceNode',
        position: { x: 325, y: 350 },
        data: {
          label: 'API Gateway',
          type: 'service',
          status: 'healthy',
          pricing: '$0.01/HR',
          cpu: 0.01,
          memory: '0.03 GB',
          disk: '2.00 GB',
          region: 2,
          sliderValue: 75,
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-3' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
  },
};

// Default graph for apps without specific data
const defaultGraph: GraphData = {
  nodes: [
    {
      id: 'node-1',
      type: 'serviceNode',
      position: { x: 250, y: 200 },
      data: {
        label: 'Service',
        type: 'service',
        status: 'healthy',
        pricing: '$0.01/HR',
        cpu: 0.01,
        memory: '0.02 GB',
        disk: '5.00 GB',
        region: 1,
        sliderValue: 50,
      },
    },
  ],
  edges: [],
};

// Simulate error for testing
let shouldError = false;
export const setMockError = (error: boolean) => {
  shouldError = error;
};

// Mock API functions
export const fetchApps = async (): Promise<App[]> => {
  await delay(100);
  if (shouldError) {
    throw new Error('Failed to fetch apps');
  }
  return apps;
};

export const fetchGraph = async (appId: string): Promise<GraphData> => {
  await delay(150);
  if (shouldError) {
    throw new Error('Failed to fetch graph');
  }
  return graphDataByApp[appId] || defaultGraph;
};
