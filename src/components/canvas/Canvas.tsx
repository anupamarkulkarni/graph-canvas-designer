import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ServiceNode } from './ServiceNode';
import { useGraph } from '@/hooks/useGraph';
import { useAppStore } from '@/store/appStore';
import { Skeleton } from '@/components/ui/skeleton';

const nodeTypes = {
  serviceNode: ServiceNode,
};

export const Canvas = () => {
  const { selectedAppId, selectedNodeId, setSelectedNodeId } = useAppStore();
  const { data: graphData, isLoading, error } = useGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes/edges when graph data changes
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes as Node[]);
      setEdges(graphData.edges as Edge[]);
    }
  }, [graphData, setNodes, setEdges]);

  // Handle node selection
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  // Handle canvas click (deselect)
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Handle node deletion
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
        setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNodeId]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Update selected state on nodes
  const nodesWithSelection = useMemo(
    () => nodes.map((node) => ({ ...node, selected: node.id === selectedNodeId })),
    [nodes, selectedNodeId]
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background dotted-canvas">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-64 h-40 rounded-xl" />
          <Skeleton className="w-48 h-40 rounded-xl" />
          <p className="text-muted-foreground">Loading graph...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background dotted-canvas">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load graph</p>
          <p className="text-muted-foreground text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      <ReactFlow
        nodes={nodesWithSelection}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="dotted-canvas"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(220 15% 22%)" />
        <Controls className="!bg-card !border-border" />
      </ReactFlow>
    </div>
  );
};
