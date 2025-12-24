import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { TaskService, Task } from '../../task.service';
import { DataAccessService } from '../../data-access.service';
import { NavigationService } from '../../navigation.service';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AddTaskDialogComponent]
})
export class TasksComponent {
  taskService = inject(TaskService);
  dataAccessService = inject(DataAccessService);
  navigationService = inject(NavigationService);
  
  showAddTaskDialog = signal(false);

  // Get role-appropriate data
  currentRole = this.navigationService.currentRole;
  tasks = this.taskService.getTasks();

  // Check if user can manage all data (admin only)
  canManageAllData = computed(() => {
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    return this.dataAccessService.canManageAllData(currentUserEmail);
  });

  // Role-based page title
  pageTitle = computed(() => {
    const role = this.currentRole();
    return role === 'admin' ? 'All Tasks' : 'My Tasks';
  });

  // Task statistics
  taskStats = computed(() => {
    const allTasks = this.tasks();
    const pending = allTasks.filter(task => task.status === 'Pending').length;
    const inProgress = allTasks.filter(task => task.status === 'In Progress').length;
    const completed = allTasks.filter(task => task.status === 'Completed').length;
    const overdue = allTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return task.status !== 'Completed' && dueDate < today;
    }).length;

    return {
      total: allTasks.length,
      pending,
      inProgress,
      completed,
      overdue
    };
  });

  // Tasks grouped by status
  tasksByStatus = computed(() => {
    const allTasks = this.tasks();
    return {
      'Pending': allTasks.filter(task => task.status === 'Pending'),
      'In Progress': allTasks.filter(task => task.status === 'In Progress'),
      'Completed': allTasks.filter(task => task.status === 'Completed')
    };
  });

  // Get priority styling
  getPriorityColor(priority: 'High' | 'Medium' | 'Low'): string {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  }

  // Get status styling
  getStatusColor(status: 'Pending' | 'In Progress' | 'Completed'): string {
    const colors = {
      'Pending': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  // Check if task is overdue
  isOverdue(task: Task): boolean {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return task.status !== 'Completed' && dueDate < today;
  }
}
