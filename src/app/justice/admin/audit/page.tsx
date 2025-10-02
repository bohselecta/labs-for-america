"use client";
import { useState, useEffect } from 'react';
import { AuditTrail, AuditLog } from '@/components/justice/AuditTrail';

export default function JusticeAuditTrailAdmin() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for demo
        const mockLogs: AuditLog[] = [
          {
            id: 'log-1',
            timestamp: new Date('2024-12-15T14:30:00'),
            actorId: 'admin-001',
            actorName: 'Detective Smith',
            action: 'TIP_STATUS_CHANGE',
            targetId: 'tip-001',
            targetType: 'tip',
            metadata: { 
              oldStatus: 'RECEIVED', 
              newStatus: 'TRIAGED',
              reason: 'Initial review completed'
            },
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 'log-2',
            timestamp: new Date('2024-12-15T13:45:00'),
            actorId: 'admin-002',
            actorName: 'Sergeant Johnson',
            action: 'CRISIS_ACTIVATED',
            targetId: 'crisis-001',
            targetType: 'crisis',
            metadata: { 
              crisisType: 'manhunt',
              reason: 'Active search initiated'
            },
            ipAddress: '192.168.1.101',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          },
          {
            id: 'log-3',
            timestamp: new Date('2024-12-15T12:20:00'),
            actorId: 'admin-001',
            actorName: 'Detective Smith',
            action: 'CASE_PUBLISHED',
            targetId: 'case-001',
            targetType: 'case',
            metadata: { 
              caseTitle: 'Missing Person - Sarah Johnson',
              assetsCount: 3,
              timelineEventsCount: 5
            },
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 'log-4',
            timestamp: new Date('2024-12-15T11:15:00'),
            actorId: 'admin-003',
            actorName: 'Lieutenant Brown',
            action: 'ASSET_UPLOADED',
            targetId: 'asset-001',
            targetType: 'asset',
            metadata: { 
              fileName: 'crime_scene_photo.jpg',
              fileSize: 2048576,
              caseId: 'case-001'
            },
            ipAddress: '192.168.1.102',
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
          },
          {
            id: 'log-5',
            timestamp: new Date('2024-12-15T10:30:00'),
            actorId: 'admin-001',
            actorName: 'Detective Smith',
            action: 'LOCK_THREAD',
            targetId: 'thread-001',
            targetType: 'thread',
            metadata: { 
              reason: 'Sensitive information detected',
              threadTitle: 'Discussion about ongoing investigation'
            },
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        ];
        
        setLogs(mockLogs);
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  const handleExport = async (format: 'json' | 'csv') => {
    try {
      if (format === 'json') {
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `audit-trail-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === 'csv') {
        const headers = ['Timestamp', 'Actor', 'Action', 'Target Type', 'Target ID', 'IP Address'];
        const csvContent = [
          headers.join(','),
          ...logs.map(log => [
            log.timestamp.toISOString(),
            `"${log.actorName}"`,
            log.action,
            log.targetType,
            log.targetId,
            log.ipAddress || ''
          ].join(','))
        ].join('\n');
        
        const dataBlob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export audit logs:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <AuditTrail
      logs={logs}
      onExport={handleExport}
    />
  );
}
