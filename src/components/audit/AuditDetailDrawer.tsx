import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { AuditEvent } from '../../types';
import { ShieldCheck, User, Clock, ArrowRight, Database } from 'lucide-react';

interface AuditDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: AuditEvent | null;
}

export const AuditDetailDrawer: React.FC<AuditDetailDrawerProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!event) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={event.action}
      subtitle={`Audit Record • ${new Date(event.timestamp).toLocaleString('en-GB')}`}
      width="md"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] font-mono text-bliv-text-secondary">
            Trace ID: {event.id}
          </span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-6 text-xs">
        {/* User Attribution Banner */}
        <div className="p-3 bg-bliv-surface-secondary rounded-bliv border border-bliv-border space-y-1">
          <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
            Attributed User
          </span>
          <p className="font-semibold text-bliv-dark text-xs flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-bliv-green" />
            <span>{event.userName}</span>
            <span className="text-[10px] font-mono text-bliv-text-secondary">({event.userId})</span>
          </p>
        </div>

        {/* Action Details */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-bliv-bg rounded-bliv border border-bliv-border">
          <div>
            <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
              Affected Entity
            </span>
            <span className="font-semibold text-bliv-dark block mt-0.5">
              {event.entityType}
            </span>
            <span className="text-[11px] text-bliv-text-secondary block truncate">
              {event.entityName}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-bliv-text-secondary block">
              System Timestamp
            </span>
            <span className="font-mono text-bliv-text-primary block mt-0.5">
              {new Date(event.timestamp).toLocaleDateString('en-GB')}
            </span>
            <span className="text-[10px] text-bliv-text-secondary font-mono block">
              {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <div>
          <span className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] block mb-1.5">
            Narrative Event Log
          </span>
          <div className="p-3 bg-bliv-bg rounded-bliv border border-bliv-border text-bliv-text-primary leading-relaxed">
            {event.description}
          </div>
        </div>

        {/* State Transition (Before & After Diffs) */}
        {(event.before || event.after) && (
          <div className="space-y-3">
            <span className="font-semibold text-bliv-dark uppercase tracking-wider text-[11px] block">
              State Transition Payload
            </span>

            {event.before && (
              <div>
                <span className="text-[10px] font-semibold text-[#8e3c35] uppercase block mb-1">
                  Previous Value (Before)
                </span>
                <pre className="p-3 bg-bliv-surface-secondary/70 border border-bliv-border rounded-bliv font-mono text-[11px] text-bliv-text-secondary overflow-x-auto">
                  {JSON.stringify(event.before, null, 2)}
                </pre>
              </div>
            )}

            {event.after && (
              <div>
                <span className="text-[10px] font-semibold text-[#366141] uppercase block mb-1">
                  Mutated Value (After)
                </span>
                <pre className="p-3 bg-[#eaf3ec]/50 border border-[#d2e4d6] rounded-bliv font-mono text-[11px] text-bliv-dark overflow-x-auto">
                  {JSON.stringify(event.after, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Regulatory Governance Note */}
        <div className="p-3 rounded-bliv bg-bliv-surface-secondary/60 border border-bliv-border text-[11px] text-bliv-text-secondary flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-bliv-green shrink-0 mt-0.5" />
          <span>
            Simulated client-side audit demonstration. In production, audit logs are securely piped to append-only WORM storage (Write Once, Read Many) to comply with data governance mandates.
          </span>
        </div>
      </div>
    </Drawer>
  );
};
