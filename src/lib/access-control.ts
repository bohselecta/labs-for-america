// Role-based access control system
export type UserRole = 'visitor' | 'contributor' | 'moderator' | 'admin' | 'org_admin';

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  organizationId?: string;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
}

export interface AccessControlContext {
  user?: User;
  labId?: string;
  organizationId?: string;
  resource?: string;
}

// Permission definitions
export const PERMISSIONS = {
  // Lab permissions
  LAB_VIEW: 'lab:view',
  LAB_CREATE: 'lab:create',
  LAB_EDIT: 'lab:edit',
  LAB_DELETE: 'lab:delete',
  LAB_CLOSE: 'lab:close',
  
  // Contribution permissions
  CONTRIBUTION_CREATE: 'contribution:create',
  CONTRIBUTION_EDIT: 'contribution:edit',
  CONTRIBUTION_DELETE: 'contribution:delete',
  CONTRIBUTION_MODERATE: 'contribution:moderate',
  
  // Vote permissions
  VOTE_CREATE: 'vote:create',
  VOTE_DELETE: 'vote:delete',
  
  // Admin permissions
  ADMIN_ACCESS: 'admin:access',
  USER_MANAGE: 'user:manage',
  SYSTEM_CONFIG: 'system:config'
} as const;

// Role definitions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  visitor: [
    { resource: 'lab', actions: ['view'] },
    { resource: 'contribution', actions: ['view'] }
  ],
  
  contributor: [
    { resource: 'lab', actions: ['view'] },
    { resource: 'contribution', actions: ['view', 'create'] },
    { resource: 'vote', actions: ['create'] }
  ],
  
  moderator: [
    { resource: 'lab', actions: ['view', 'edit'] },
    { resource: 'contribution', actions: ['view', 'create', 'edit', 'moderate'] },
    { resource: 'vote', actions: ['view', 'create', 'delete'] }
  ],
  
  admin: [
    { resource: 'lab', actions: ['view', 'create', 'edit', 'delete', 'close'] },
    { resource: 'contribution', actions: ['view', 'create', 'edit', 'delete', 'moderate'] },
    { resource: 'vote', actions: ['view', 'create', 'delete'] },
    { resource: 'admin', actions: ['access'] },
    { resource: 'user', actions: ['manage'] }
  ],
  
  org_admin: [
    { resource: 'lab', actions: ['view', 'create', 'edit', 'delete', 'close'] },
    { resource: 'contribution', actions: ['view', 'create', 'edit', 'delete', 'moderate'] },
    { resource: 'vote', actions: ['view', 'create', 'delete'] },
    { resource: 'admin', actions: ['access'] },
    { resource: 'user', actions: ['manage'] },
    { resource: 'system', actions: ['config'] }
  ]
};

// Check if user has permission
export function hasPermission(
  user: User | null,
  permission: string,
  context?: AccessControlContext
): boolean {
  if (!user) {
    return permission === PERMISSIONS.LAB_VIEW || permission === PERMISSIONS.CONTRIBUTION_CREATE;
  }

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  
  // Check if user has the specific permission
  const hasDirectPermission = userPermissions.some(perm => 
    perm.actions.includes(permission.split(':')[1]) &&
    perm.resource === permission.split(':')[0]
  );

  if (hasDirectPermission) {
    // Check conditions if any
    const permissionDef = userPermissions.find(perm => 
      perm.actions.includes(permission.split(':')[1]) &&
      perm.resource === permission.split(':')[0]
    );

    if (permissionDef?.conditions && context) {
      return checkConditions(permissionDef.conditions, context);
    }

    return true;
  }

  return false;
}

// Check permission conditions
function checkConditions(conditions: Record<string, any>, context: AccessControlContext): boolean {
  // Check organization ownership
  if (conditions.ownOrganization && context.organizationId) {
    return context.user?.organizationId === context.organizationId;
  }

  // Check lab ownership
  if (conditions.ownLab && context.labId) {
    // This would need to be implemented with actual lab ownership data
    return true; // Placeholder
  }

  return true;
}

// Get user role from session/token
export function getUserRole(sessionData: any): UserRole {
  if (!sessionData) return 'visitor';
  
  // This would integrate with your auth system
  if (sessionData.isAdmin) return 'admin';
  if (sessionData.isModerator) return 'moderator';
  if (sessionData.isOrgAdmin) return 'org_admin';
  if (sessionData.isAuthenticated) return 'contributor';
  
  return 'visitor';
}

// Create user object from session
export function createUserFromSession(sessionData: any): User | null {
  if (!sessionData) return null;

  const role = getUserRole(sessionData);
  
  return {
    id: sessionData.userId || 'anonymous',
    name: sessionData.name || 'Anonymous',
    email: sessionData.email,
    role,
    organizationId: sessionData.organizationId,
    permissions: ROLE_PERMISSIONS[role] || []
  };
}

// Middleware for API routes
export function requirePermission(permission: string) {
  return (req: any, res: any, next: any) => {
    const user = createUserFromSession(req.session);
    
    if (!hasPermission(user, permission)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: permission,
        userRole: user?.role || 'visitor'
      });
    }
    
    req.user = user;
    next();
  };
}

// Component-level permission check
export function usePermission(permission: string, context?: AccessControlContext): boolean {
  // This would integrate with your auth context
  const user = null; // Get from auth context
  
  return hasPermission(user, permission, context);
}

// Get available actions for a resource
export function getAvailableActions(user: User | null, resource: string): string[] {
  if (!user) {
    return resource === 'lab' ? ['view'] : [];
  }

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  const resourcePermission = userPermissions.find(perm => perm.resource === resource);
  
  return resourcePermission?.actions || [];
}
