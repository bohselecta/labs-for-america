import React from 'react';

// Status color tokens for consistent theming
export const STATUS_COLORS = {
  // Lab status colors
  open: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    badge: 'bg-green-100 text-green-800',
    icon: 'text-green-600'
  },
  upcoming: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    icon: 'text-blue-600'
  },
  closed: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    ring: 'ring-gray-500',
    badge: 'bg-gray-100 text-gray-800',
    icon: 'text-gray-600'
  },
  overdue: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    badge: 'bg-red-100 text-red-800',
    icon: 'text-red-600'
  },
  
  // Contribution status colors
  proposed: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    ring: 'ring-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: 'text-yellow-600'
  },
  'in-review': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    icon: 'text-blue-600'
  },
  accepted: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    badge: 'bg-green-100 text-green-800',
    icon: 'text-green-600'
  },
  'not-adopted': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    ring: 'ring-gray-500',
    badge: 'bg-gray-100 text-gray-800',
    icon: 'text-gray-600'
  },
  
  // Priority colors
  high: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    badge: 'bg-red-100 text-red-800',
    icon: 'text-red-600'
  },
  medium: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    ring: 'ring-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: 'text-yellow-600'
  },
  low: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    badge: 'bg-green-100 text-green-800',
    icon: 'text-green-600'
  },
  
  // Category colors
  civic: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    icon: 'text-blue-600'
  },
  justice: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    ring: 'ring-purple-500',
    badge: 'bg-purple-100 text-purple-800',
    icon: 'text-purple-600'
  },
  education: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    badge: 'bg-green-100 text-green-800',
    icon: 'text-green-600'
  },
  health: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    badge: 'bg-red-100 text-red-800',
    icon: 'text-red-600'
  },
  
  // Template colors
  city: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    icon: 'text-blue-600'
  },
  pd: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    ring: 'ring-indigo-500',
    badge: 'bg-indigo-100 text-indigo-800',
    icon: 'text-indigo-600'
  },
  fire: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    badge: 'bg-red-100 text-red-800',
    icon: 'text-red-600'
  },
  county: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    badge: 'bg-green-100 text-green-800',
    icon: 'text-green-600'
  }
} as const;

// Status icon mapping
export const STATUS_ICONS = {
  open: 'status-open',
  upcoming: 'status-pending',
  closed: 'status-closed',
  overdue: 'status-closed',
  proposed: 'status-pending',
  'in-review': 'status-pending',
  accepted: 'status-open',
  'not-adopted': 'status-closed',
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low'
} as const;

// Status label mapping
export const STATUS_LABELS = {
  open: 'Open',
  upcoming: 'Upcoming',
  closed: 'Closed',
  overdue: 'Overdue',
  proposed: 'Proposed',
  'in-review': 'In Review',
  accepted: 'Accepted',
  'not-adopted': 'Not Adopted',
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority'
} as const;

// Helper function to get status colors
export function getStatusColors(status: keyof typeof STATUS_COLORS) {
  return STATUS_COLORS[status] || STATUS_COLORS.closed;
}

// Helper function to get status icon
export function getStatusIcon(status: keyof typeof STATUS_ICONS) {
  return STATUS_ICONS[status] || 'status-pending';
}

// Helper function to get status label
export function getStatusLabel(status: keyof typeof STATUS_LABELS) {
  return STATUS_LABELS[status] || 'Unknown';
}

// Status badge component
export function StatusBadge({ 
  status, 
  className = '',
  showIcon = true
}: { 
  status: keyof typeof STATUS_COLORS;
  className?: string;
  showIcon?: boolean;
}) {
  const colors = getStatusColors(status);
  const icon = getStatusIcon(status);
  const label = getStatusLabel(status);
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors.badge} ${className}`}>
      {showIcon && <span className={`w-2 h-2 rounded-full ${colors.icon.replace('text-', 'bg-')}`}></span>}
      {label}
    </span>
  );
}

// Status indicator component
export function StatusIndicator({ 
  status, 
  size = 'sm',
  className = ''
}: { 
  status: keyof typeof STATUS_COLORS;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const colors = getStatusColors(status);
  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full ${colors.icon.replace('text-', 'bg-')} ${className}`}></div>
  );
}

// Status card component
export function StatusCard({ 
  status, 
  children,
  className = ''
}: { 
  status: keyof typeof STATUS_COLORS;
  children: React.ReactNode;
  className?: string;
}) {
  const colors = getStatusColors(status);
  
  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}
