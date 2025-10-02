import React, { useState } from 'react';

export interface AuditLog {
  id: string;
  timestamp: Date;
  actorId: string;
  actorName: string;
  action: string;
  targetId: string;
  targetType: string;
  metadata: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditTrailProps {
  logs: AuditLog[];
  onExport: (format: 'json' | 'csv') => void;
  filters?: {
    action?: string;
    actorId?: string;
    targetType?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
}

export function AuditTrail({ logs, onExport, filters }: AuditTrailProps) {
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const actionLabels = {
    'LOCK_THREAD': 'Thread Locked',
    'UNLOCK_THREAD': 'Thread Unlocked',
    'TIP_STATUS_CHANGE': 'Tip Status Changed',
    'CASE_PUBLISHED': 'Case Published',
    'ASSET_UPLOADED': 'Asset Uploaded',
    'ASSET_REDACTED': 'Asset Redacted',
    'CRISIS_ACTIVATED': 'Crisis Mode Activated',
    'CRISIS_DEACTIVATED': 'Crisis Mode Deactivated',
    'USER_ROLE_CHANGED': 'User Role Changed',
    'SETTINGS_UPDATED': 'Settings Updated',
    'REPORT_GENERATED': 'Report Generated',
    'DATA_EXPORTED': 'Data Exported'
  };

  const actionColors = {
    'LOCK_THREAD': 'bg-red-100 text-red-800',
    'UNLOCK_THREAD': 'bg-green-100 text-green-800',
    'TIP_STATUS_CHANGE': 'bg-blue-100 text-blue-800',
    'CASE_PUBLISHED': 'bg-purple-100 text-purple-800',
    'ASSET_UPLOADED': 'bg-yellow-100 text-yellow-800',
    'ASSET_REDACTED': 'bg-orange-100 text-orange-800',
    'CRISIS_ACTIVATED': 'bg-red-100 text-red-800',
    'CRISIS_DEACTIVATED': 'bg-green-100 text-green-800',
    'USER_ROLE_CHANGED': 'bg-indigo-100 text-indigo-800',
    'SETTINGS_UPDATED': 'bg-gray-100 text-gray-800',
    'REPORT_GENERATED': 'bg-blue-100 text-blue-800',
    'DATA_EXPORTED': 'bg-green-100 text-green-800'
  };

  const handleExport = async (format: 'json' | 'csv') => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filters?.action && log.action !== filters.action) return false;
    if (filters?.actorId && log.actorId !== filters.actorId) return false;
    if (filters?.targetType && log.targetType !== filters.targetType) return false;
    if (filters?.dateRange) {
      const logDate = new Date(log.timestamp);
      if (logDate < filters.dateRange.start || logDate > filters.dateRange.end) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Audit Trail</h1>
            <p className="text-gray-600">
              Immutable log of all sensitive actions for chain-of-custody compliance.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('json')}
              disabled={isExporting}
              className="btn-secondary"
            >
              {isExporting ? 'Exporting...' : 'Export JSON'}
            </button>
            <button
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="btn-secondary"
            >
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Audit Trail Information</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• All logs are immutable and cannot be modified</li>
            <li>• Logs include actor, action, target, and metadata</li>
            <li>• IP addresses and user agents are recorded for security</li>
            <li>• Export formats support internal review and compliance</li>
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
            <select className="form-field">
              <option value="">All Actions</option>
              {Object.entries(actionLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Actor</label>
            <input
              type="text"
              placeholder="Actor ID or name"
              className="form-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Type</label>
            <select className="form-field">
              <option value="">All Types</option>
              <option value="thread">Thread</option>
              <option value="tip">Tip</option>
              <option value="case">Case</option>
              <option value="asset">Asset</option>
              <option value="user">User</option>
              <option value="settings">Settings</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input
              type="date"
              className="form-field"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedLogs.includes(log.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLogs([...selectedLogs, log.id]);
                          } else {
                            setSelectedLogs(selectedLogs.filter(id => id !== log.id));
                          }
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.timestamp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{log.actorName}</div>
                        <div className="text-gray-500">{log.actorId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${actionColors[log.action as keyof typeof actionColors] || 'badge-secondary'}`}>
                        {actionLabels[log.action as keyof typeof actionLabels] || log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{log.targetType}</div>
                        <div className="text-gray-500">{log.targetId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          // Show metadata in a modal or expandable section
                          console.log('Metadata:', log.metadata);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredLogs.length} of {logs.length} logs
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary">Previous</button>
            <button className="btn-secondary">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Audit log creation utility
export function createAuditLog(
  actorId: string,
  actorName: string,
  action: string,
  targetId: string,
  targetType: string,
  metadata: Record<string, any> = {},
  ipAddress?: string,
  userAgent?: string
): Omit<AuditLog, 'id' | 'timestamp'> {
  return {
    actorId,
    actorName,
    action,
    targetId,
    targetType,
    metadata,
    ipAddress,
    userAgent
  };
}

// Audit log actions enum
export const AUDIT_ACTIONS = {
  LOCK_THREAD: 'LOCK_THREAD',
  UNLOCK_THREAD: 'UNLOCK_THREAD',
  TIP_STATUS_CHANGE: 'TIP_STATUS_CHANGE',
  CASE_PUBLISHED: 'CASE_PUBLISHED',
  ASSET_UPLOADED: 'ASSET_UPLOADED',
  ASSET_REDACTED: 'ASSET_REDACTED',
  CRISIS_ACTIVATED: 'CRISIS_ACTIVATED',
  CRISIS_DEACTIVATED: 'CRISIS_DEACTIVATED',
  USER_ROLE_CHANGED: 'USER_ROLE_CHANGED',
  SETTINGS_UPDATED: 'SETTINGS_UPDATED',
  REPORT_GENERATED: 'REPORT_GENERATED',
  DATA_EXPORTED: 'DATA_EXPORTED'
} as const;
