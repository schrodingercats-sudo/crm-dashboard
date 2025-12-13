import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  isAddTaskModalOpen = signal(false);

  tasks = signal([
    { id: 1, title: 'Follow up with Acme Corp', description: 'Discuss the new contract terms and pricing model.', priority: 'High', priorityColor: 'bg-red-100 text-red-800', dueDate: 'Today', assigneeAvatar: 'https://i.pravatar.cc/150?u=1', completed: false },
    { id: 2, title: 'Prepare Q3 Presentation', description: 'Gather metrics from the marketing team.', priority: 'Medium', priorityColor: 'bg-yellow-100 text-yellow-800', dueDate: 'Tomorrow', assigneeAvatar: 'https://i.pravatar.cc/150?u=2', completed: false },
    { id: 3, title: 'Email Campaign Review', description: 'Review the draft for the upcoming newsletter.', priority: 'Low', priorityColor: 'bg-green-100 text-green-800', dueDate: 'Yesterday', assigneeAvatar: 'https://i.pravatar.cc/150?u=1', completed: true },
    { id: 4, title: 'Update Client Records', description: 'Ensure all contact details are up to date in the CRM.', priority: 'None', priorityColor: 'bg-gray-100 text-gray-800', dueDate: 'Next Week', assigneeAvatar: 'https://i.pravatar.cc/150?u=3', completed: false },
  ]);

  openAddTaskModal() {
    this.isAddTaskModalOpen.set(true);
  }

  closeAddTaskModal() {
    this.isAddTaskModalOpen.set(false);
  }

  toggleTask(id: number) {
    this.tasks.update(tasks => tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  addTask(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const priority = (form.elements.namedItem('priority') as HTMLSelectElement).value;

    let priorityColor = 'bg-gray-100 text-gray-800';
    if (priority === 'High') priorityColor = 'bg-red-100 text-red-800';
    else if (priority === 'Medium') priorityColor = 'bg-yellow-100 text-yellow-800';
    else if (priority === 'Low') priorityColor = 'bg-green-100 text-green-800';

    const newTask = {
      id: this.tasks().length + 1,
      title,
      description,
      priority,
      priorityColor,
      dueDate: 'Today',
      assigneeAvatar: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 100)}`,
      completed: false
    };

    this.tasks.update(tasks => [newTask, ...tasks]);
    this.closeAddTaskModal();
  }
}
