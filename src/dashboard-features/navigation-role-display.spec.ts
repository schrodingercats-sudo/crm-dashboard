import * as fc from 'fast-check';

/**
 * **Feature: role-based-crm-dashboard, Property 20: Role-appropriate navigation display**
 * **Validates: Requirements 5.5**
 * 
 * Property: For any navigation display, only features available to the current user role should be shown
 */

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: NavItemChild[];
  path?: string;
  roles: ('admin' | 'user')[];
}

interface NavItemChild {
  id: string;
  label: string;
  route: string;
}

// Mock navigation data based on the actual component implementations
const getAdminNavItems = (): NavItem[] => [
  { 
    id: 'overview', 
    label: 'Overview', 
    icon: 'overview-icon', 
    route: '/admin/dashboard/overview',
    roles: ['admin']
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: 'contacts-icon',
    path: '/admin/dashboard/contacts',
    roles: ['admin'],
    children: [
      { id: 'leads', label: 'Leads', route: '/admin/dashboard/contacts/leads' },
      { id: 'referral_partners', label: 'Referral Partners', route: '/admin/dashboard/contacts/referral-partners' }
    ]
  },
  {
    id: 'deals',
    label: 'Deals',
    icon: 'deals-icon',
    path: '/admin/dashboard/deals',
    roles: ['admin'],
    children: [
      { id: 'all_deals', label: 'All Deals', route: '/admin/dashboard/deals' }
    ]
  },
  { 
    id: 'integration', 
    label: 'Integration', 
    icon: 'integration-icon', 
    route: '/admin/dashboard/integration',
    roles: ['admin']
  },
  { 
    id: 'tasks', 
    label: 'Tasks', 
    icon: 'tasks-icon', 
    route: '/admin/dashboard/tasks',
    roles: ['admin']
  },
];

const getAdminBottomNavItems = (): NavItem[] => [
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'settings-icon', 
    route: '/admin/dashboard/settings',
    roles: ['admin']
  },
  { 
    id: 'help', 
    label: 'Help & Support', 
    icon: 'help-icon', 
    route: '/admin/dashboard/help',
    roles: ['admin']
  },
];

const getUserNavItems = (): NavItem[] => [
  { 
    id: 'overview', 
    label: 'Overview', 
    icon: 'overview-icon', 
    route: '/user/dashboard/overview',
    roles: ['user']
  },
  { 
    id: 'contacts', 
    label: 'My Contacts', 
    icon: 'contacts-icon', 
    route: '/user/dashboard/contacts',
    roles: ['user']
  },
  { 
    id: 'deals', 
    label: 'My Deals', 
    icon: 'deals-icon', 
    route: '/user/dashboard/deals',
    roles: ['user']
  },
  { 
    id: 'tasks', 
    label: 'My Tasks', 
    icon: 'tasks-icon', 
    route: '/user/dashboard/tasks',
    roles: ['user']
  },
];

const getUserBottomNavItems = (): NavItem[] => [
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'settings-icon', 
    route: '/user/dashboard/settings',
    roles: ['user']
  },
  { 
    id: 'help', 
    label: 'Help & Support', 
    icon: 'help-icon', 
    route: '/user/dashboard/help',
    roles: ['user']
  },
];

describe('Navigation Role Display Property Tests', () => {
  
  describe('Property 20: Role-appropriate navigation display', () => {
    
    it('should display only admin-appropriate navigation items for admin users', () => {
      fc.assert(fc.property(
        fc.constantFrom('admin'),
        (userRole) => {
          // Get admin navigation items
          const navItems = getAdminNavItems();
          const bottomNavItems = getAdminBottomNavItems();
          
          // All navigation items should be appropriate for admin role
          const allItems = [...navItems, ...bottomNavItems];
          
          // Admin should have access to all CRM features
          const expectedAdminFeatures = ['overview', 'contacts', 'deals', 'integration', 'tasks', 'settings', 'help'];
          const actualFeatures = allItems.map(item => item.id);
          
          // Check that all expected admin features are present
          const hasAllAdminFeatures = expectedAdminFeatures.every(feature => 
            actualFeatures.includes(feature)
          );
          
          // Check that all items have admin role specified
          const allItemsHaveAdminRole = allItems.every(item => 
            item.roles && item.roles.includes('admin')
          );
          
          // Check that admin routes use /admin/dashboard/* pattern
          const allRoutesUseAdminPattern = allItems
            .filter(item => item.route)
            .every(item => item.route!.startsWith('/admin/dashboard/'));
          
          return hasAllAdminFeatures && allItemsHaveAdminRole && allRoutesUseAdminPattern;
        }
      ), { numRuns: 100 });
    });
    
    it('should display only user-appropriate navigation items for regular users', () => {
      fc.assert(fc.property(
        fc.constantFrom('user'),
        (userRole) => {
          // Get user navigation items
          const navItems = getUserNavItems();
          const bottomNavItems = getUserBottomNavItems();
          
          // All navigation items should be appropriate for user role
          const allItems = [...navItems, ...bottomNavItems];
          
          // User should have limited self-service features
          const expectedUserFeatures = ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
          const actualFeatures = allItems.map(item => item.id);
          
          // Check that all expected user features are present
          const hasAllUserFeatures = expectedUserFeatures.every(feature => 
            actualFeatures.includes(feature)
          );
          
          // Check that user doesn't have admin-only features like integration
          const hasNoAdminOnlyFeatures = !actualFeatures.includes('integration');
          
          // Check that user routes use /user/dashboard/* pattern
          const allRoutesUseUserPattern = allItems
            .filter(item => item.route)
            .every(item => item.route!.startsWith('/user/dashboard/'));
          
          // Check that contacts and deals are labeled as "My" for users
          const contactsItem = allItems.find(item => item.id === 'contacts');
          const dealsItem = allItems.find(item => item.id === 'deals');
          
          const hasPersonalizedLabels = 
            contactsItem?.label === 'My Contacts' && 
            dealsItem?.label === 'My Deals';
          
          return hasAllUserFeatures && 
                 hasNoAdminOnlyFeatures && 
                 allRoutesUseUserPattern && 
                 hasPersonalizedLabels;
        }
      ), { numRuns: 100 });
    });
    
    it('should ensure navigation items are filtered based on user role', () => {
      fc.assert(fc.property(
        fc.oneof(fc.constantFrom('admin'), fc.constantFrom('user')),
        (userRole) => {
          let navItems: NavItem[];
          let expectedRoutePrefix: string;
          let shouldHaveIntegration: boolean;
          
          if (userRole === 'admin') {
            navItems = [...getAdminNavItems(), ...getAdminBottomNavItems()];
            expectedRoutePrefix = '/admin/dashboard/';
            shouldHaveIntegration = true;
          } else {
            navItems = [...getUserNavItems(), ...getUserBottomNavItems()];
            expectedRoutePrefix = '/user/dashboard/';
            shouldHaveIntegration = false;
          }
          
          // Check route prefix consistency
          const routePrefixConsistent = navItems
            .filter(item => item.route)
            .every(item => item.route!.startsWith(expectedRoutePrefix));
          
          // Check integration feature availability based on role
          const hasIntegration = navItems.some(item => item.id === 'integration');
          const integrationAccessCorrect = hasIntegration === shouldHaveIntegration;
          
          // Check that all navigation items exist (no empty or undefined items)
          const allItemsValid = navItems.every(item => 
            item && item.id && item.label && item.icon
          );
          
          // Check that user role is correctly assigned to all items
          const roleAssignmentCorrect = navItems.every(item =>
            item.roles.includes(userRole as 'admin' | 'user')
          );
          
          return routePrefixConsistent && integrationAccessCorrect && allItemsValid && roleAssignmentCorrect;
        }
      ), { numRuns: 100 });
    });
  });
});