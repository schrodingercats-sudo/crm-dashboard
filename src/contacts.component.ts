import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService, Lead } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  private contactService = inject(ContactService);
  allLeads = this.contactService.getLeads();

  itemsPerPage = 7;
  currentPage = signal(2); // Set to 2 to match the image

  paginatedLeads = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.allLeads().slice(start, end);
  });

  // New computed signal to ensure the table has a consistent number of rows
  displayRows = computed<(Lead | null)[]>(() => {
    const leads = this.paginatedLeads();
    const emptyRowsCount = this.itemsPerPage - leads.length;
    if (emptyRowsCount > 0) {
      return [...leads, ...Array(emptyRowsCount).fill(null)];
    }
    return leads;
  });

  totalPages = computed(() => Math.ceil(this.allLeads().length / this.itemsPerPage));

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  getStageClass(stage: Lead['stage']): string {
    switch (stage) {
      case 'New':
        return 'bg-purple-100 text-purple-800 font-medium';
      case 'In progress':
        return 'bg-green-100 text-green-800 font-medium';
      case 'Loan Granted':
        return 'bg-yellow-100 text-yellow-800 font-medium';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}