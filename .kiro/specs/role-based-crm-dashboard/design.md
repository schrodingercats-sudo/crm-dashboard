# Design Document

## Overview

The role-based CRM dashboard system will extend the existing Angular CRM application to support two distinct user experiences: an admin dashboard with full management capabilities and a user dashboard with self-service features. The system will leverage existing components and styling while implementing role-based routing, navigation, and data access controls.

## Architecture

The system follows a role-based architecture pattern with the following key components:

- **Authentication Layer**: Enhanced to support role-based routing decisions
- **Route Guards**: Role-specific guards to protect admin and user routes
- **Dashboard Layouts**: Separate layout components for admin and user experiences
- **Navigation Components**: Role-aware sidebar and header components
- **Feature Components**: Reused existing components with role-based data filtering

## Components and Interfaces

### Enhanced Authentication Service
- Extends existing `AuthService` with role-based navigation logic
- Maintains current admin email validation
- Implements routing decisions based on user role

### Route Guards
- `AdminGuard`: Protects admin routes, ensures only admin users can access
- `UserGuard`: Protects user routes, ensures authenticated users can access
- Enhanced `AuthGuard`: General authentication protection

### Dashboard Components
- `AdminDashboardLayoutComponent`: Layout for admin dashboard using existing design patterns
- `UserDashboardLayoutComponent`: Layout for user dashboard with limited navigation
- `AdminSidebarComponent`: Full navigation sidebar for admin features
- `UserSidebarComponent`: Limited navigation sidebar for user features

### Route Structure
```
/admin/dashboard/
  ├── overview (admin overview with all system data)
  ├── contacts/
  │   ├── leads (all system leads)
  │   └── referral-partners (all referral partners)
  ├── deals (all system deals)
  ├── integration (system integrations)
  ├── tasks (all system tasks)
  ├── settings (system settings)
  └── help (admin help)

/user/dashboard/
  ├── overview (user-specific overview)
  ├── contacts (user's contacts only)
  ├── deals (user's deals only)
  ├── tasks (user's tasks only)
  ├── settings (user settings)
  └── help (user help)
```

## Data Models

### User Role Model
```typescript
interface UserRole {
  email: string;
  role: 'admin' | 'user';
  permissions: string[];
}
```

### Navigation Item Model (Enhanced)
```typescript
interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: NavItemChild[];
  path?: string;
  roles: ('admin' | 'user')[];  // New: role-based visibility
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

<function_calls>
<invoke name="prework">
<parameter name="featureName">role-based-crm-dashboard
Pro
perty 1: Admin login navigation
*For any* admin user login, the system should redirect to `/admin/dashboard/overview`
**Validates: Requirements 1.1**

Property 2: Admin navigation completeness
*For any* admin user accessing the dashboard, all CRM navigation features should be visible and accessible
**Validates: Requirements 1.2**

Property 3: Admin data access
*For any* admin user viewing CRM sections, all system data should be accessible without restrictions
**Validates: Requirements 1.3**

Property 4: Admin management capabilities
*For any* admin dashboard access, management capabilities for all users' data should be available
**Validates: Requirements 1.4**

Property 5: Admin route structure consistency
*For any* admin navigation action, the URL should maintain the `/admin/dashboard/*` pattern
**Validates: Requirements 1.5**

Property 6: Regular user login navigation
*For any* regular user login, the system should redirect to `/user/dashboard/overview`
**Validates: Requirements 2.1**

Property 7: User navigation limitation
*For any* regular user accessing the dashboard, only self-service navigation items should be visible
**Validates: Requirements 2.2**

Property 8: User data isolation
*For any* regular user viewing CRM sections, only their own account data should be accessible
**Validates: Requirements 2.3**

Property 9: User feature restriction
*For any* user dashboard access, admin-only features should not be available
**Validates: Requirements 2.4**

Property 10: User route structure consistency
*For any* regular user navigation action, the URL should maintain the `/user/dashboard/*` pattern
**Validates: Requirements 2.5**

Property 11: Route protection for regular users
*For any* regular user attempting to access admin routes, the system should redirect to their user dashboard
**Validates: Requirements 3.1**

Property 12: Admin route access flexibility
*For any* admin user, both admin and user routes should be accessible
**Validates: Requirements 3.2**

Property 13: Route permission validation
*For any* route navigation attempt, user permissions should be validated before access is granted
**Validates: Requirements 3.3**

Property 14: Route guard implementation
*For any* role-based route, appropriate guards and redirects should be implemented
**Validates: Requirements 3.4**

Property 15: Authentication state route updates
*For any* authentication state change, route access permissions should be updated accordingly
**Validates: Requirements 3.5**

Property 16: User dashboard feature completeness
*For any* user dashboard, overview, personal contacts, personal deals, and personal tasks features should be available
**Validates: Requirements 5.1**

Property 17: Admin dashboard feature preservation
*For any* admin dashboard, all existing CRM management capabilities should remain available
**Validates: Requirements 5.2**

Property 18: User data isolation enforcement
*For any* user interaction with dashboard data, access should be restricted to their own account data only
**Validates: Requirements 5.3**

Property 19: Role-based feature distinction
*For any* feature access determination, admin and user capabilities should be clearly distinguished
**Validates: Requirements 5.4**

Property 20: Role-appropriate navigation display
*For any* navigation display, only features available to the current user role should be shown
**Validates: Requirements 5.5**

## Error Handling

### Authentication Errors
- Invalid user sessions should redirect to login page
- Failed role determination should default to user role with appropriate error logging
- Network authentication failures should provide user-friendly error messages

### Route Access Errors
- Unauthorized route access attempts should redirect to appropriate dashboard
- Missing route parameters should redirect to default dashboard overview
- Invalid route patterns should redirect to 404 or appropriate fallback

### Data Access Errors
- Failed data loading should display appropriate error states
- Permission denied errors should show user-friendly messages
- Network failures should provide retry mechanisms

## Testing Strategy

The testing approach combines unit testing for specific component behaviors and property-based testing for universal system properties.

### Unit Testing
- Component rendering with different user roles
- Route guard behavior for specific scenarios
- Navigation item filtering based on roles
- Authentication service role determination

### Property-Based Testing
Using Jest with fast-check library for property-based testing:
- Each property-based test will run a minimum of 100 iterations
- Tests will generate random user data and verify role-based behaviors
- Each test will be tagged with the format: **Feature: role-based-crm-dashboard, Property {number}: {property_text}**
- Properties will verify universal behaviors across all valid user inputs and system states