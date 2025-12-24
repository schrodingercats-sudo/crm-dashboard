
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, Lead } from '../../contact.service';
import { ToastService } from '../../toast.service';
import { inject } from '@angular/core';

@Component({
    selector: 'app-add-contact-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Add New Contact</h3>
          <button (click)="close()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input [(ngModel)]="contact.name" name="name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input [(ngModel)]="contact.email" name="email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input [(ngModel)]="contact.phone" name="phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input [(ngModel)]="contact.amount" name="amount" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <select [(ngModel)]="contact.purpose" name="purpose" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
                <option value="Home Loan">Home Loan</option>
                <option value="Gold Loan">Gold Loan</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Car Loan">Car Loan</option>
                <option value="Property Loan">Property Loan</option>
                <option value="Education Loan">Education Loan</option>
            </select>
          </div>

          <div>
             <label class="block text-sm font-medium text-gray-700 mb-1">Stage</label>
             <select [(ngModel)]="contact.stage" name="stage" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all">
                <option value="New">New</option>
                <option value="In progress">In Progress</option>
                <option value="Loan Granted">Loan Granted</option>
             </select>
          </div>

          <div class="pt-4 flex justify-end space-x-3">
            <button type="button" (click)="close()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" [disabled]="loading" class="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors">
                {{ loading ? 'Saving...' : 'Save Contact' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddContactDialogComponent {
    @Output() closed = new EventEmitter<void>();
    private contactService = inject(ContactService);
    private toastService = inject(ToastService);

    loading = false;

    contact: any = {
        name: '',
        email: '',
        phone: '',
        purpose: 'Home Loan',
        amount: 0,
        progress: 0,
        stage: 'New',
        leadOwners: [],
        avatar: 'https://i.pravatar.cc/150?u=' + Math.random() // Placeholder random avatar
    };

    close() {
        this.closed.emit();
    }

    async onSubmit() {
        this.loading = true;
        try {
            await this.contactService.addContact(this.contact);
            this.toastService.show('Contact added successfully', 'success');
            this.close();
        } catch (e) {
            console.error(e);
            this.toastService.show('Failed to add contact', 'error');
        } finally {
            this.loading = false;
        }
    }
}
