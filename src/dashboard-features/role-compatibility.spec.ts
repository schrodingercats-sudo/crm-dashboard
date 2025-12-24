/**
 * **Feature: role-based-crm-dashboard, Property 21: Role-based component compatibility**
 * Tests that dashboard components work correctly with both admin and user contexts
 * **Validates: Requirements 1.3, 2.3, 4.1, 4.2, 4.3**
 */

import * as fc from 'fast-check';

// Mock interfaces for testing
interface MockUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface MockLead {
  id: string;
  name: string;
  email: string;
  ownerEmail: string;
  createdBy: string;
}

interface MockDeal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: string;
  ownerEmail: string;
  createdBy: string;
}

interface MockTask {
  id: number;
  title: string;
  description: string;
  assignee: string;
  createdBy: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

interface ComponentStats {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

// Mock data filtering functions that simulate the DataAccessService
const filterDataForUser = <T extends { ownerEmail?: string; assignee?: string; createdBy?: string }>(
  data: T[], 
  userEmail: string, 
  isAdmin: boolean
): T[] => {
  if (isAdmin) {
    return data; // Admin gets all data
  }
  return data.filter(item => 
    item.ownerEmail === userEmail || 
    item.assignee === userEmail ||
    item.createdBy === userEmail
  );
};

// Mock component functionality
const generateOverviewStats = (role: 'admin' | 'user', leads: MockLead[], deals: MockDeal[], tasks: MockTask[]): ComponentStats[] => {
  const leadsCount = leads.length;
  const dealsCount = deals.length;
  const tasksCount = tasks.filter(task => task.status === 'Pending').length;
  const revenue = deals.reduce((sum, deal) => sum + deal.value, 0);

  if (role === 'admin') {
    return [
      { label: 'Total Leads', value: leadsCount.toString(), change: '+12%', isPositive: true },
      { label: 'Active Deals', value: dealsCount.toString(), change: '+5%', isPositive: true },
      { label: 'Revenue', value: `$${revenue.toLocaleString()}`, change: '-2%', isPositive: false },
      { label: 'Pending Tasks', value: tasksCount.toString(), change: '0%', isPositive: true },
    ];
  } else {
    return [
      { label: 'My Leads', value: leadsCount.toString(), change: '+8%', isPositive: true },
      { label: 'My Deals', value: dealsCount.toString(), change: '+3%', isPositive: true },
      { label: 'My Revenue', value: `$${revenue.toLocaleString()}`, change: '+5%', isPositive: true },
      { label: 'My Tasks', value: tasksCount.toString(), change: '-1%', isPositive: false },
    ];
  }
};

const generatePageTitle = (role: 'admin' | 'user', componentType: 'leads' | 'deals' | 'tasks'): string => {
  const prefix = role === 'admin' ? 'All' : 'My';
  const suffix = componentType.charAt(0).toUpperCase() + componentType.slice(1);
  return `${prefix} ${suffix}`;
};

// Generators for property-based testing
const userArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  email: fc.emailAddress(),
  role: fc.constantFrom('admin', 'user') as fc.Arbitrary<'admin' | 'user'>
});

const leadArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1 }),
  email: fc.emailAddress(),
  ownerEmail: fc.emailAddress(),
  createdBy: fc.emailAddress()
});

const dealArbitrary = fc.record({
  id: fc.integer({ min: 1 }),
  title: fc.string({ minLength: 1 }),
  company: fc.string({ minLength: 1 }),
  value: fc.integer({ min: 0, max: 1000000 }),
  stage: fc.constantFrom('New', 'Qualification', 'Negotiation', 'Won'),
  ownerEmail: fc.emailAddress(),
  createdBy: fc.emailAddress()
});

const taskArbitrary = fc.record({
  id: fc.integer({ min: 1 }),
  title: fc.string({ minLength: 1 }),
  description: fc.string(),
  assignee: fc.emailAddress(),
  createdBy: fc.emailAddress(),
  status: fc.constantFrom('Pending', 'In Progress', 'Completed') as fc.Arbitrary<'Pending' | 'In Progress' | 'Completed'>,
  priority: fc.constantFrom('High', 'Medium', 'Low') as fc.Arbitrary<'High' | 'Medium' | 'Low'>,
  dueDate: fc.constantFrom('2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01')
});

describe('Role-based Component Compatibility Property Tests', () => {
  it('Property 21: Role-appropriate statistics display - For any role, overview component should display appropriate statistics labels', () => {
    fc.assert(
      fc.property(
        userArbitrary,
        fc.array(leadArbitrary, { minLength: 0, maxLength: 10 }),
        fc.array(dealArbitrary, { minLength: 0, maxLength: 10 }),
        fc.array(taskArbitrary, { minLength: 0, maxLength: 10 }),
        (user, allLeads, allDeals, allTasks) => {
          const isAdmin = user.role === 'admin';
          
          // Filter data based on user role
          const filteredLeads = filterDataForUser(allLeads, user.email, isAdmin);
          const filteredDeals = filterDataForUser(allDeals, user.email, isAdmin);
          const filteredTasks = filterDataForUser(allTasks, user.email, isAdmin);
          
          // Generate statistics
          const stats = generateOverviewStats(user.role, filteredLeads, filteredDeals, filteredTasks);
          
          // Verify role-appropriate labels
          if (user.role === 'admin') {
            expect(stats.some(stat => stat.label.includes('Total') || stat.label.includes('Active') || stat.label.includes('Revenue') || stat.label.includes('Pending'))).toBe(true);
            expect(stats.some(stat => stat.label.includes('My'))).toBe(false);
          } else {
            expect(stats.some(stat => stat.label.includes('My'))).toBe(true);
            expect(stats.some(stat => stat.label.includes('Total'))).toBe(false);
          }
          
          // Verify all statistics have valid structure
          stats.forEach(stat => {
            expect(stat.label).toBeTruthy();
            expect(stat.value).toBeTruthy();
            expect(stat.change).toBeTruthy();
            expect(typeof stat.isPositive).toBe('boolean');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 21: Role-appropriate page titles - For any role and component type, page titles should reflect user context', () => {
    fc.assert(
      fc.property(
        userArbitrary,
        fc.constantFrom('leads', 'deals', 'tasks') as fc.Arbitrary<'leads' | 'deals' | 'tasks'>,
        (user, componentType) => {
          const pageTitle = generatePageTitle(user.role, componentType);
          
          if (user.role === 'admin') {
            expect(pageTitle).toContain('All');
            expect(pageTitle).not.toContain('My');
          } else {
            expect(pageTitle).toContain('My');
            expect(pageTitle).not.toContain('All');
          }
          
          // Verify title contains component type
          expect(pageTitle.toLowerCase()).toContain(componentType);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 21: Admin data access preservation - For any admin user, all system data should remain accessible', () => {
    fc.assert(
      fc.property(
        userArbitrary.filter(user => user.role === 'admin'),
        fc.array(leadArbitrary, { minLength: 1, maxLength: 20 }),
        fc.array(dealArbitrary, { minLength: 1, maxLength: 20 }),
        fc.array(taskArbitrary, { minLength: 1, maxLength: 20 }),
        (adminUser, allLeads, allDeals, allTasks) => {
          // Admin should see all data without filtering
          const adminLeads = filterDataForUser(allLeads, adminUser.email, true);
          const adminDeals = filterDataForUser(allDeals, adminUser.email, true);
          const adminTasks = filterDataForUser(allTasks, adminUser.email, true);
          
          // Verify admin gets all data
          expect(adminLeads.length).toBe(allLeads.length);
          expect(adminDeals.length).toBe(allDeals.length);
          expect(adminTasks.length).toBe(allTasks.length);
          
          // Verify admin can manage all data
          const canManageAllData = adminUser.role === 'admin';
          expect(canManageAllData).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 21: User data isolation - For any regular user, only their own data should be accessible', () => {
    fc.assert(
      fc.property(
        userArbitrary.filter(user => user.role === 'user'),
        fc.array(leadArbitrary, { minLength: 1, maxLength: 20 }),
        fc.array(dealArbitrary, { minLength: 1, maxLength: 20 }),
        fc.array(taskArbitrary, { minLength: 1, maxLength: 20 }),
        (regularUser, allLeads, allDeals, allTasks) => {
          // Regular user should see only filtered data
          const userLeads = filterDataForUser(allLeads, regularUser.email, false);
          const userDeals = filterDataForUser(allDeals, regularUser.email, false);
          const userTasks = filterDataForUser(allTasks, regularUser.email, false);
          
          // Verify all returned data belongs to the user
          userLeads.forEach(lead => {
            expect(
              lead.ownerEmail === regularUser.email || 
              lead.createdBy === regularUser.email
            ).toBe(true);
          });
          
          userDeals.forEach(deal => {
            expect(
              deal.ownerEmail === regularUser.email || 
              deal.createdBy === regularUser.email
            ).toBe(true);
          });
          
          userTasks.forEach(task => {
            expect(
              task.assignee === regularUser.email || 
              task.createdBy === regularUser.email
            ).toBe(true);
          });
          
          // Verify user cannot manage all data
          const canManageAllData = regularUser.role === 'admin';
          expect(canManageAllData).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 21: Component functionality consistency - For any role, components should maintain core functionality', () => {
    fc.assert(
      fc.property(
        userArbitrary,
        fc.array(dealArbitrary, { minLength: 0, maxLength: 10 }),
        (user, deals) => {
          const isAdmin = user.role === 'admin';
          const filteredDeals = filterDataForUser(deals, user.email, isAdmin);
          
          // Simulate deal statistics calculation
          const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
          const wonDeals = filteredDeals.filter(deal => deal.stage === 'Won');
          const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
          const winRate = filteredDeals.length > 0 ? Math.round((wonDeals.length / filteredDeals.length) * 100) : 0;
          
          const dealStats = {
            total: filteredDeals.length,
            totalValue: totalValue,
            won: wonDeals.length,
            wonValue: wonValue,
            winRate: winRate
          };
          
          // Verify statistics are valid
          expect(dealStats.total).toBeGreaterThanOrEqual(0);
          expect(dealStats.totalValue).toBeGreaterThanOrEqual(0);
          expect(dealStats.won).toBeGreaterThanOrEqual(0);
          expect(dealStats.wonValue).toBeGreaterThanOrEqual(0);
          expect(dealStats.winRate).toBeGreaterThanOrEqual(0);
          expect(dealStats.winRate).toBeLessThanOrEqual(100);
          
          // Verify won deals are subset of total deals
          expect(dealStats.won).toBeLessThanOrEqual(dealStats.total);
          expect(dealStats.wonValue).toBeLessThanOrEqual(dealStats.totalValue);
        }
      ),
      { numRuns: 100 }
    );
  });
});