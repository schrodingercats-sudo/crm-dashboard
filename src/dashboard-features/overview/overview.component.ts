
import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { NavigationService } from '../../navigation.service';
import { ContactService } from '../../contact.service';
import { DealService } from '../../deal.service';
import { TaskService } from '../../task.service';
import { DataAccessService } from '../../data-access.service';

@Component({
  standalone: true,
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private navigationService = inject(NavigationService);
  private contactService = inject(ContactService);
  private dealService = inject(DealService);
  private taskService = inject(TaskService);
  private dataAccessService = inject(DataAccessService);

  // Get role-based routes for navigation
  currentRole = this.navigationService.currentRole;
  baseRoute = computed(() => {
    const role = this.currentRole();
    return role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
  });

  // Role-based data access
  leads = this.contactService.getLeads();
  deals = this.dealService.getDeals();
  tasks = this.taskService.getTasks();

  // Computed statistics based on role and filtered data
  stats = computed(() => {
    const role = this.currentRole();
    const leadsCount = this.leads().length;
    const dealsCount = this.deals().length;
    const tasksCount = this.tasks().filter(task => task.status === 'Pending').length;
    const revenue = this.deals().reduce((sum, deal) => sum + (deal.value || 0), 0);

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
  });

  // Role-based recent activity
  recentActivity = computed(() => {
    const role = this.currentRole();
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    
    if (role === 'admin') {
      // Admin sees system-wide activity
      return [
        { id: 1, title: 'New lead added', description: 'Jenny Wilson joined as a new lead', time: '2 hours ago', icon: 'User' },
        { id: 2, title: 'Deal closed', description: 'Tech Corp deal marked as won', time: '5 hours ago', icon: 'CheckCircle' },
        { id: 3, title: 'Meeting scheduled', description: 'Demo with Product Team', time: '1 day ago', icon: 'Calendar' },
        { id: 4, title: 'Email sent', description: 'Follow-up sent to Jacob Jones', time: '2 days ago', icon: 'Mail' },
        { id: 5, title: 'User registered', description: 'New user account created', time: '3 days ago', icon: 'UserPlus' },
      ];
    } else {
      // Regular user sees their own activity
      return [
        { id: 1, title: 'Lead updated', description: 'Updated contact information for prospect', time: '1 hour ago', icon: 'User' },
        { id: 2, title: 'Task completed', description: 'Finished follow-up call with client', time: '3 hours ago', icon: 'CheckCircle' },
        { id: 3, title: 'Deal progressed', description: 'Moved deal to negotiation stage', time: '1 day ago', icon: 'TrendingUp' },
        { id: 4, title: 'Meeting attended', description: 'Client presentation completed', time: '2 days ago', icon: 'Calendar' },
      ];
    }
  });

  // Check if user can manage all data (admin only)
  canManageAllData = computed(() => {
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    return this.dataAccessService.canManageAllData(currentUserEmail);
  });
}
