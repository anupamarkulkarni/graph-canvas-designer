import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings, Cpu, HardDrive, Server, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ServiceIcon, AwsLogo } from '@/components/icons/ServiceIcons';
import type { ServiceNodeData } from '@/types/graph';

interface ServiceNodeProps {
  data: ServiceNodeData;
  selected?: boolean;
}

const statusStyles = {
  healthy: 'bg-success/20 text-success border-success/30',
  degraded: 'bg-warning/20 text-warning border-warning/30',
  down: 'bg-destructive/20 text-destructive border-destructive/30',
};

const statusLabels = {
  healthy: 'Success',
  degraded: 'Degraded',
  down: 'Error',
};

export const ServiceNode = memo(({ data, selected }: ServiceNodeProps) => {
  return (
    <div
      className={cn(
        'bg-card rounded-xl border-2 p-4 min-w-[280px] transition-all duration-200',
        selected ? 'border-node-selected shadow-lg shadow-primary/20' : 'border-node-border'
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ServiceIcon type={data.type} label={data.label} />
          <span className="font-semibold text-foreground">{data.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-medium">
            {data.pricing}
          </Badge>
          <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground mb-4">
        <div className="text-center">{data.cpu}</div>
        <div className="text-center">{data.memory}</div>
        <div className="text-center">{data.disk}</div>
        <div className="text-center">{data.region}</div>
      </div>

      {/* Metric tabs */}
      <div className="flex gap-1 mb-4">
        {[
          { icon: Cpu, label: 'CPU', active: true },
          { icon: Server, label: 'Memory', active: false },
          { icon: HardDrive, label: 'Disk', active: false },
          { icon: MapPin, label: 'Region', active: false },
        ].map((tab, i) => (
          <button
            key={i}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs transition-colors',
              tab.active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent'
            )}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Slider visualization */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-success via-warning to-destructive rounded-full transition-all"
            style={{ width: `${data.sliderValue}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground w-12 text-right">{(data.sliderValue / 100 * 0.04).toFixed(2)}</span>
      </div>

      {/* Status + Provider */}
      <div className="flex items-center justify-between">
        <Badge className={cn('text-xs', statusStyles[data.status])}>
          {data.status === 'healthy' ? '✓' : '⚠'} {statusLabels[data.status]}
        </Badge>
        <AwsLogo />
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3" />
    </div>
  );
});

ServiceNode.displayName = 'ServiceNode';
