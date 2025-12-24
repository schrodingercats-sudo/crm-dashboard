import * as fc from 'fast-check';

// Simple data access control logic for testing
class DataAccessController {
  private readonly ADMIN_EMAILS = ['pratham.solanki30@gmail.com'];

  isAdmin(email: string | null | undefined): boolean {
    return !!email && this.ADMIN_EMAILS.includes(email);
  }

  filterDataForUser(data: any[], userEmail: string | null): any[] {
    if (this.isAdmin(userEmail)) {
      // Admin gets all data
      return data;
    } else {
      // Regular users get only their own data
      return data.filter(item => 
        item.ownerEmail === userEmail || 
        item.assignee === userEmail ||
        item.email === userEmail ||
        item.createdBy === userEmail
      );
    }
  }

  hasFeatureAccess(feature: string, userEmail: string | null): boolean {
    if (this.isAdmin(userEmail)) {
      // Admin has access to all features
      return true;
    } else {
      // Regular users have limited access
      const userFeatures = ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
      return userFeatures.includes(feature);
    }
  }

  getAvailableFeatures(userEmail: string | null): string[] {
    if (this.isAdmin(userEmail)) {
      // Admin gets all features including admin-only ones
      return [
        'overview', 'contacts', 'deals', 'tasks', 'settings', 'help',
        'integration', 'referral-partners', 'user-management', 'system-settings'
      ];
    } else {
      // Regular users get limited features
      return ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
    }
  }

  canManageAllData(userEmail: string | null): boolean {
    return this.isAdmin(userEmail);
  }

  canAccessAdminRoutes(userEmail: string | null): boolean {
    return this.isAdmin(userEmail);
  }
}

describe('Data Access Controls', () => {
  let controller: DataAccessController;

  beforeEach(() => {
    controller = new DataAccessController();
  });

  /**
   * **Feature: role-based-crm-dashboard, Property 3: Admin data access**
   * **Validates: Requirements 1.3**
   */
  it('should allow admin users to access all system data without restrictions', () => {
    fc.assert(fc.property(
      fc.array(fc.record({
        id: fc.string(),
        name: fc.string(),
        email: fc.emailAddress(),
        phone: fc.string(),
        purpose: fc.string(),
        amount: fc.nat(),
        progress: fc.nat(100),
        stage: fc.constantFrom('New', 'In progress', 'Loan Granted'),
        avatar: fc.webUrl(),
        leadOwners: fc.array(fc.record({
          name: fc.string(),
          avatar: fc.webUrl()
        }))
      }), { minLength: 1, maxLength: 50 }),
      fc.array(fc.record({
        id: fc.nat(),
        title: fc.string(),
        company: fc.string(),
        value: fc.nat(),
        stage: fc.string(),
        ownerAvatar: fc.webUrl(),
        type: fc.string(),
        typeColor: fc.string()
      }), { minLength: 1, maxLength: 50 }),
      fc.array(fc.record({
        id: fc.nat(),
        title: fc.string(),
        description: fc.string(),
        dueDate: fc.string(),
        priority: fc.constantFrom('High', 'Medium', 'Low'),
        status: fc.constantFrom('Pending', 'In Progress', 'Completed'),
        assignee: fc.string()
      }), { minLength: 1, maxLength: 50 }),
      (contacts, deals, tasks) => {
        // Test admin email recognition
        const adminEmail = 'pratham.solanki30@gmail.com';
        const isAdmin = controller.isAdmin(adminEmail);
        
        // Admin should be recognized as admin
        expect(isAdmin).toBe(true);
        
        // Admin should get all data without filtering
        const adminContacts = controller.filterDataForUser(contacts, adminEmail);
        const adminDeals = controller.filterDataForUser(deals, adminEmail);
        const adminTasks = controller.filterDataForUser(tasks, adminEmail);
        
        expect(adminContacts).toEqual(contacts);
        expect(adminDeals).toEqual(deals);
        expect(adminTasks).toEqual(tasks);
        
        // Admin should have access to all features
        const allFeatures = ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help', 'integration', 'referral-partners'];
        allFeatures.forEach(feature => {
          expect(controller.hasFeatureAccess(feature, adminEmail)).toBe(true);
        });
      }
    ), { numRuns: 100 });
  });

  /**
   * **Feature: role-based-crm-dashboard, Property 18: User data isolation enforcement**
   * **Validates: Requirements 5.3**
   */
  it('should enforce data isolation between different user accounts', () => {
    fc.assert(fc.property(
      fc.array(fc.record({
        id: fc.string(),
        name: fc.string(),
        email: fc.emailAddress(),
        ownerEmail: fc.emailAddress(),
        phone: fc.string(),
        purpose: fc.string(),
        amount: fc.nat(),
        progress: fc.nat(100),
        stage: fc.constantFrom('New', 'In progress', 'Loan Granted'),
        avatar: fc.webUrl()
      }), { minLength: 2, maxLength: 50 }),
      fc.array(fc.record({
        id: fc.nat(),
        title: fc.string(),
        company: fc.string(),
        value: fc.nat(),
        stage: fc.string(),
        ownerEmail: fc.emailAddress(),
        createdBy: fc.emailAddress(),
        type: fc.string(),
        typeColor: fc.string()
      }), { minLength: 2, maxLength: 50 }),
      fc.array(fc.record({
        id: fc.nat(),
        title: fc.string(),
        description: fc.string(),
        dueDate: fc.string(),
        priority: fc.constantFrom('High', 'Medium', 'Low'),
        status: fc.constantFrom('Pending', 'In Progress', 'Completed'),
        assignee: fc.emailAddress(),
        createdBy: fc.emailAddress()
      }), { minLength: 2, maxLength: 50 }),
      fc.emailAddress(),
      fc.emailAddress(),
      (contacts, deals, tasks, userEmail1, userEmail2) => {
        // Ensure we have different users
        fc.pre(userEmail1 !== userEmail2);
        fc.pre(!controller.isAdmin(userEmail1));
        fc.pre(!controller.isAdmin(userEmail2));
        
        // Filter data for each user
        const user1Contacts = controller.filterDataForUser(contacts, userEmail1);
        const user1Deals = controller.filterDataForUser(deals, userEmail1);
        const user1Tasks = controller.filterDataForUser(tasks, userEmail1);
        
        const user2Contacts = controller.filterDataForUser(contacts, userEmail2);
        const user2Deals = controller.filterDataForUser(deals, userEmail2);
        const user2Tasks = controller.filterDataForUser(tasks, userEmail2);
        
        // Each user should only see their own data
        user1Contacts.forEach(contact => {
          expect(
            contact.ownerEmail === userEmail1 || 
            contact.email === userEmail1
          ).toBe(true);
        });
        
        user1Deals.forEach(deal => {
          expect(
            deal.ownerEmail === userEmail1 || 
            deal.createdBy === userEmail1
          ).toBe(true);
        });
        
        user1Tasks.forEach(task => {
          expect(
            task.assignee === userEmail1 || 
            task.createdBy === userEmail1
          ).toBe(true);
        });
        
        // User 1 should not see User 2's exclusive data
        const user2ExclusiveContacts = contacts.filter(c => 
          (c.ownerEmail === userEmail2 || c.email === userEmail2) &&
          c.ownerEmail !== userEmail1 && c.email !== userEmail1
        );
        
        user2ExclusiveContacts.forEach(contact => {
          expect(user1Contacts).not.toContain(contact);
        });
      }
    ), { numRuns: 100 });
  });

  /**
   * **Feature: role-based-crm-dashboard, Property 19: Role-based feature distinction**
   * **Validates: Requirements 5.4**
   */
  it('should clearly distinguish between admin and user capabilities', () => {
    fc.assert(fc.property(
      fc.emailAddress(),
      fc.emailAddress(),
      (adminEmail, userEmail) => {
        // Ensure we test with the actual admin email and a different user email
        const actualAdminEmail = 'pratham.solanki30@gmail.com';
        fc.pre(userEmail !== actualAdminEmail);
        
        // Test admin capabilities
        const adminFeatures = controller.getAvailableFeatures(actualAdminEmail);
        const userFeatures = controller.getAvailableFeatures(userEmail);
        
        // Admin should have more features than regular users
        expect(adminFeatures.length).toBeGreaterThan(userFeatures.length);
        
        // All user features should be included in admin features
        userFeatures.forEach(feature => {
          expect(adminFeatures).toContain(feature);
        });
        
        // Admin should have exclusive features
        const adminOnlyFeatures = ['integration', 'referral-partners', 'user-management', 'system-settings'];
        adminOnlyFeatures.forEach(feature => {
          expect(controller.hasFeatureAccess(feature, actualAdminEmail)).toBe(true);
          expect(controller.hasFeatureAccess(feature, userEmail)).toBe(false);
        });
        
        // Admin should be able to manage all data
        expect(controller.canManageAllData(actualAdminEmail)).toBe(true);
        expect(controller.canManageAllData(userEmail)).toBe(false);
        
        // Admin should be able to access admin routes
        expect(controller.canAccessAdminRoutes(actualAdminEmail)).toBe(true);
        expect(controller.canAccessAdminRoutes(userEmail)).toBe(false);
        
        // Regular users should have access to basic features
        const basicFeatures = ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
        basicFeatures.forEach(feature => {
          expect(controller.hasFeatureAccess(feature, userEmail)).toBe(true);
        });
      }
    ), { numRuns: 100 });
  });
});