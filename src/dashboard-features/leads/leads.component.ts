
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { ContactService, Lead } from '../../contact.service';
import { DataAccessService } from '../../data-access.service';
import { NavigationService } from '../../navigation.service';

import { AddContactDialogComponent } from '../../components/add-contact-dialog/add-contact-dialog.component';

@Component({
  standalone: true,
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AddContactDialogComponent],
})
export class LeadsComponent {
  contactService = inject(ContactService);
  dataAccessService = inject(DataAccessService);
  navigationService = inject(NavigationService);
  
  activeTab = signal('leads');
  showAddContactDialog = signal(false);

  // Get role-appropriate data
  currentRole = this.navigationService.currentRole;
  leads = this.contactService.getLeads();

  // Role-based referrals data (admin sees all, users see their own)
  referrals = computed(() => {
    const role = this.currentRole();
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    
    const allReferrals = [
      { id: 1, name: 'Esther Howard', email: 'esther.howard@gmail.com', type: 'Real Estate Agent', referred: 12, commission: '$4,500', status: 'Active', ownerEmail: 'pratham.solanki30@gmail.com' },
      { id: 2, name: 'Cameron Williamson', email: 'cameron.williamson@gmail.com', type: 'Financial Advisor', referred: 8, commission: '$3,200', status: 'Active', ownerEmail: 'user@example.com' },
      { id: 3, name: 'Brooklyn Simmons', email: 'brooklyn.simmons@gmail.com', type: 'Lawyer', referred: 3, commission: '$1,100', status: 'Pending', ownerEmail: 'pratham.solanki30@gmail.com' },
      { id: 4, name: 'Guy Hawkins', email: 'guy.hawkins@gmail.com', type: 'Mortgage Broker', referred: 25, commission: '$12,000', status: 'Active', ownerEmail: 'user@example.com' },
      { id: 5, name: 'Robert Fox', email: 'robert.fox@gmail.com', type: 'Accountant', referred: 5, commission: '$1,800', status: 'Inactive', ownerEmail: currentUserEmail || 'user@example.com' },
    ];

    // Filter referrals based on user role
    return this.dataAccessService.filterDataForUser(allReferrals, currentUserEmail);
  });

  itemsPerPage = signal(5);
  currentPage = signal(1);

  paginatedLeads = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    return this.leads().slice(startIndex, startIndex + this.itemsPerPage());
  });

  totalPages = computed(() => Math.ceil(this.leads().length / this.itemsPerPage()));

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    // Simple pagination logic for now (all pages if small count, else ellipsis logic could be added)
    // Given the small dataset, we'll just show all pages for simplicity, or a simple window.
    // Let's implement a simple version that shows all pages since the dataset is small.
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  });

  stageClasses = computed(() => {
    return (stage: 'New' | 'In progress' | 'Loan Granted') => {
      switch (stage) {
        case 'New':
          return 'bg-purple-100 text-purple-800';
        case 'In progress':
          return 'bg-green-100 text-green-800';
        case 'Loan Granted':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  });

  // Check if user can manage all data (admin only)
  canManageAllData = computed(() => {
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    return this.dataAccessService.canManageAllData(currentUserEmail);
  });

  // Role-based page title
  pageTitle = computed(() => {
    const role = this.currentRole();
    return role === 'admin' ? 'All Leads' : 'My Leads';
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
