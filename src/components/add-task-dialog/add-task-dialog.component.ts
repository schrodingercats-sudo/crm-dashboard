
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../task.service';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-add-task-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Add New Task</h3>
          <button (click)="close()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input [(ngModel)]="task.title" name="title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea [(ngModel)]="task.description" name="description" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select [(ngModel)]="task.priority" name="priority" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
             </div>
             <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select [(ngModel)]="task.status" name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                 <input [(ngModel)]="task.dueDate" name="dueDate" type="date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
            </div>
            <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                 <input [(ngModel)]="task.assignee" name="assignee" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
            </div>
          </div>

          <div class="pt-4 flex justify-end space-x-3">
            <button type="button" (click)="close()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" [disabled]="loading" class="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors">
                {{ loading ? 'Saving...' : 'Save Task' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddTaskDialogComponent {
    @Output() closed = new EventEmitter<void>();
    private taskService = inject(TaskService);
    private toastService = inject(ToastService);
    loading = false;

    task: any = {
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        status: 'Pending',
        assignee: 'Me'
    };

    close() {
        this.closed.emit();
    }

    async onSubmit() {
        this.loading = true;
        try {
            await this.taskService.addTask(this.task);
            this.toastService.show('Task added successfully', 'success');
            this.close();
        } catch (e) {
            console.error(e);
            this.toastService.show('Failed to add task', 'error');
        } finally {
            this.loading = false;
        }
    }
}
