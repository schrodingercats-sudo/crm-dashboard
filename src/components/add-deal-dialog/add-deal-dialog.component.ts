
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DealService } from '../../deal.service';
import { ToastService } from '../../toast.service';

@Component({
    selector: 'app-add-deal-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Add New Deal</h3>
          <button (click)="close()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
            <input [(ngModel)]="deal.title" name="title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input [(ngModel)]="deal.company" name="company" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
          </div>

          <div>
             <label class="block text-sm font-medium text-gray-700 mb-1">Value</label>
             <input [(ngModel)]="deal.value" name="value" type="number" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
          </div>

          <div>
             <label class="block text-sm font-medium text-gray-700 mb-1">Stage</label>
             <select [(ngModel)]="deal.stage" name="stage" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
                <option value="New">New</option>
                <option value="Qualification">Qualification</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
             </select>
          </div>

          <div>
             <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
             <select [(ngModel)]="deal.type" name="type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
                <option value="Software">Software</option>
                <option value="Service">Service</option>
                <option value="Consulting">Consulting</option>
                <option value="Training">Training</option>
             </select>
          </div>

          <div class="pt-4 flex justify-end space-x-3">
            <button type="button" (click)="close()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" [disabled]="loading" class="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors">
                {{ loading ? 'Saving...' : 'Save Deal' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddDealDialogComponent {
    @Output() closed = new EventEmitter<void>();
    private dealService = inject(DealService);
    private toastService = inject(ToastService);

    loading = false;

    deal: any = {
        title: '',
        company: '',
        value: 0,
        stage: 'New',
        ownerAvatar: 'https://i.pravatar.cc/150?u=' + Math.random(),
        type: 'Software',
        typeColor: 'bg-blue-100 text-blue-800'
    };

    close() {
        this.closed.emit();
    }

    async onSubmit() {
        this.loading = true;
        try {
            await this.dealService.addDeal(this.deal);
            this.toastService.show('Deal added successfully', 'success');
            this.close();
        } catch (e) {
            console.error(e);
            this.toastService.show('Failed to add deal', 'error');
        } finally {
            this.loading = false;
        }
    }
}
