
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  stats = signal([
    { label: 'Total Leads', value: '1,234', change: '+12%', isPositive: true },
    { label: 'Active Deals', value: '56', change: '+5%', isPositive: true },
    { label: 'Revenue', value: '$124,500', change: '-2%', isPositive: false },
    { label: 'Pending Tasks', value: '12', change: '0%', isPositive: true },
  ]);

  recentActivity = signal([
    { id: 1, title: 'New lead added', description: 'Jenny Wilson joined as a new lead', time: '2 hours ago', icon: 'User' },
    { id: 2, title: 'Deal closed', description: 'Tech Corp deal marked as won', time: '5 hours ago', icon: 'CheckCircle' },
    { id: 3, title: 'Meeting scheduled', description: 'Demo with Product Team', time: '1 day ago', icon: 'Calendar' },
    { id: 4, title: 'Email sent', description: 'Follow-up sent to Jacob Jones', time: '2 days ago', icon: 'Mail' },
  ]);
}
