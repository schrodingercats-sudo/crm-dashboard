
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  tasks = signal([
    { id: 1, title: 'Follow up with new leads', description: 'Contact the 5 new leads from yesterday.', dueDate: '2023-10-27', priority: 'High', status: 'Pending', assignee: 'Alice' },
    { id: 2, title: 'Prepare Q4 Report', description: 'Compile sales data for Q4 review.', dueDate: '2023-11-01', priority: 'Medium', status: 'In Progress', assignee: 'Bob' },
    { id: 3, title: 'Client Meeting: Tech Corp', description: 'Discuss renewal contract terms.', dueDate: '2023-10-30', priority: 'High', status: 'Pending', assignee: 'Charlie' },
    { id: 4, title: 'Update CRM Records', description: 'Clean up duplicate contacts.', dueDate: '2023-11-05', priority: 'Low', status: 'Completed', assignee: 'Alice' },
    { id: 5, title: 'Team Sync', description: 'Weekly sales team sync.', dueDate: '2023-10-28', priority: 'Medium', status: 'Completed', assignee: 'David' },
  ]);
}
