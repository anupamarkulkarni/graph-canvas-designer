import { useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/appStore';
import { useGraph } from '@/hooks/useGraph';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import type { ServiceNodeData, GraphData } from '@/types/graph';

const statusStyles = {
  healthy: 'bg-success/20 text-success border-success/30',
  degraded: 'bg-warning/20 text-warning border-warning/30',
  down: 'bg-destructive/20 text-destructive border-destructive/30',
};

export const NodeInspector = () => {
  const { selectedAppId, selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const { data: graphData } = useGraph(selectedAppId);
  const queryClient = useQueryClient();

  const selectedNode = useMemo(() => {
    return graphData?.nodes.find((n) => n.id === selectedNodeId);
  }, [graphData, selectedNodeId]);

  const updateNodeData = useCallback(
    (updates: Partial<ServiceNodeData>) => {
      if (!selectedAppId || !selectedNodeId) return;

      queryClient.setQueryData(['graph', selectedAppId], (old: GraphData | undefined) => {
        if (!old) return old;
        return {
          ...old,
          nodes: old.nodes.map((node) =>
            node.id === selectedNodeId
              ? { ...node, data: { ...node.data, ...updates } }
              : node
          ),
        };
      });
    },
    [queryClient, selectedAppId, selectedNodeId]
  );

  if (!selectedNode) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p className="text-sm">Select a node to inspect</p>
      </div>
    );
  }

  const nodeData = selectedNode.data;

  return (
    <div className="p-4 border-t border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Service Node</h3>
        <Badge className={cn('text-xs', statusStyles[nodeData.status])}>
          {nodeData.status}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeInspectorTab} onValueChange={(v) => setActiveInspectorTab(v as 'config' | 'runtime')}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="config" className="flex-1">Config</TabsTrigger>
          <TabsTrigger value="runtime" className="flex-1">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="node-name">Name</Label>
            <Input
              id="node-name"
              value={nodeData.label}
              onChange={(e) => updateNodeData({ label: e.target.value })}
              className="bg-secondary"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="node-description">Description</Label>
            <Textarea
              id="node-description"
              value={nodeData.description || ''}
              onChange={(e) => updateNodeData({ description: e.target.value })}
              placeholder="Add a description..."
              className="bg-secondary min-h-[80px]"
            />
          </div>

          {/* Synced Slider + Input */}
          <div className="space-y-2">
            <Label>Resource Allocation</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[nodeData.sliderValue]}
                onValueChange={([value]) => updateNodeData({ sliderValue: value })}
                max={100}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={nodeData.sliderValue}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(100, Number(e.target.value)));
                  updateNodeData({ sliderValue: value });
                }}
                className="w-20 bg-secondary text-center"
                min={0}
                max={100}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-muted-foreground mb-1">CPU</p>
              <p className="font-semibold">{nodeData.cpu}</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-muted-foreground mb-1">Memory</p>
              <p className="font-semibold">{nodeData.memory}</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-muted-foreground mb-1">Disk</p>
              <p className="font-semibold">{nodeData.disk}</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-muted-foreground mb-1">Region</p>
              <p className="font-semibold">{nodeData.region}</p>
            </div>
          </div>

          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-muted-foreground mb-1">Pricing</p>
            <p className="font-semibold text-primary">{nodeData.pricing}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
