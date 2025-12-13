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
  currentPage = signal(1);
  searchQuery = signal('');
  selectedLeadIds = signal<Set<number>>(new Set());

  filteredLeads = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.allLeads().filter(lead =>
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.purpose.toLowerCase().includes(query)
    );
  });

  paginatedLeads = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLeads().slice(start, end);
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

  totalPages = computed(() => Math.ceil(this.filteredLeads().length / this.itemsPerPage));

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
    return pages;
  });

  goToPage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages()) {
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

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.currentPage.set(1); // Reset to first page on search
  }

  toggleSelection(id: number): void {
    this.selectedLeadIds.update(ids => {
      const newIds = new Set(ids);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  }

  toggleAllSelection(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedLeadIds.set(new Set(this.paginatedLeads().map(l => l.id)));
    } else {
      this.selectedLeadIds.set(new Set());
    }
  }

  isSelected(id: number): boolean {
    return this.selectedLeadIds().has(id);
  }

  isAllSelected(): boolean {
    const leads = this.paginatedLeads();
    return leads.length > 0 && leads.every(l => this.isSelected(l.id));
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