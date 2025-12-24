import { Injectable, signal, inject } from '@angular/core';
import { DataAccessService } from './data-access.service';

export interface Task {
    id?: number; // Optional for creation
    title: string;
    description: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'In Progress' | 'Completed';
    assignee: string;
    createdBy?: string; // Added for data access control
}

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private dataAccessService = inject(DataAccessService);
    private allTasks = signal<Task[]>([]);
    private filteredTasks = signal<Task[]>([]);
    isLoading = signal(false);

    constructor() {
        this.initializeMockData();
    }

    private initializeMockData() {
        // Mock data with different assignees and creators
        const mockTasks: Task[] = [
            {
                id: 1,
                title: 'Follow up with TechCorp',
                description: 'Schedule demo call for enterprise software license',
                dueDate: '2024-01-15',
                priority: 'High',
                status: 'Pending',
                assignee: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            },
            {
                id: 2,
                title: 'Prepare marketing proposal',
                description: 'Create detailed proposal for Digital Marketing Pro campaign',
                dueDate: '2024-01-18',
                priority: 'Medium',
                status: 'In Progress',
                assignee: 'user@example.com',
                createdBy: 'user@example.com'
            },
            {
                id: 3,
                title: 'Review contract terms',
                description: 'Legal review of CloudTech infrastructure contract',
                dueDate: '2024-01-12',
                priority: 'High',
                status: 'Completed',
                assignee: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            },
            {
                id: 4,
                title: 'Client onboarding call',
                description: 'Onboarding session with AppDev Studios team',
                dueDate: '2024-01-20',
                priority: 'Medium',
                status: 'Pending',
                assignee: 'user@example.com',
                createdBy: 'user@example.com'
            },
            {
                id: 5,
                title: 'Data migration planning',
                description: 'Plan data migration strategy for DataInsights Corp',
                dueDate: '2024-01-25',
                priority: 'Low',
                status: 'Pending',
                assignee: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            },
            {
                id: 6,
                title: 'Security assessment report',
                description: 'Complete security audit report for SecureIT Solutions',
                dueDate: '2024-01-16',
                priority: 'High',
                status: 'In Progress',
                assignee: 'user@example.com',
                createdBy: 'user@example.com'
            }
        ];

        this.allTasks.set(mockTasks);
        this.applyDataFiltering();
    }

    private applyDataFiltering() {
        const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
        const filtered = this.dataAccessService.filterDataForUser(this.allTasks(), currentUserEmail);
        this.filteredTasks.set(filtered);
    }

    getTasks() {
        return this.filteredTasks.asReadonly();
    }

    getAllTasks() {
        // Only admin can access all tasks
        const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
        if (this.dataAccessService.canManageAllData(currentUserEmail)) {
            return this.allTasks.asReadonly();
        }
        return this.filteredTasks.asReadonly();
    }

    async addTask(task: Task) {
        try {
            const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
            const taskWithCreator = {
                ...task,
                id: Date.now(),
                createdBy: currentUserEmail,
                assignee: task.assignee || currentUserEmail || ''
            };
            
            this.allTasks.update(tasks => [taskWithCreator, ...tasks]);
            this.applyDataFiltering();
        } catch (error) {
            console.error('Failed to add task:', error);
            throw error;
        }
    }

    // Method to refresh data filtering when user changes
    refreshDataFiltering() {
        this.applyDataFiltering();
    }
}
