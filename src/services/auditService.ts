import { AuditEvent, AuditEntityType, Clinician } from '../types';
import { StorageService } from './storageService';

export class AuditService {
  public static logAction(
    user: Clinician,
    action: string,
    entityType: AuditEntityType,
    entityId: string,
    entityName: string,
    description: string,
    before?: Record<string, any> | null,
    after?: Record<string, any> | null
  ): AuditEvent {
    const events = StorageService.getAuditEvents();
    
    const newEvent: AuditEvent = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: user.id,
      userName: user.name,
      action,
      entityType,
      entityId,
      entityName,
      timestamp: new Date().toISOString(),
      description,
      before: before ?? null,
      after: after ?? null,
    };

    // Prepend new event so most recent is first
    const updated = [newEvent, ...events];
    StorageService.saveAuditEvents(updated);
    return newEvent;
  }

  public static getAll(): AuditEvent[] {
    return StorageService.getAuditEvents();
  }

  public static getByEntity(entityId: string): AuditEvent[] {
    return StorageService.getAuditEvents().filter(e => e.entityId === entityId);
  }
}
