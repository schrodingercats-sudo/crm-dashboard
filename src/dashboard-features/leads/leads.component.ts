
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface Lead {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  purpose: string;
  amount: number;
  leadOwners: { name: string; avatar: string }[];
  progress: number;
  stage: 'New' | 'In progress' | 'Loan Granted';
}

@Component({
  standalone: true,
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class LeadsComponent {
  activeTab = signal('leads');

  leads = signal<Lead[]>([
    { id: 1, name: 'Jenny Wilson', avatar: 'https://picsum.photos/id/1027/50/50', email: 'jenny.wilson@gmail.com', phone: '(603) 555-0123', purpose: 'Home Loan', amount: 978878, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'B', avatar: 'https://picsum.photos/id/1011/50/50' }], progress: 70, stage: 'New' },
    { id: 2, name: 'Eleanor Pena', avatar: 'https://picsum.photos/id/1028/50/50', email: 'eleanor.pena@gmail.com', phone: '(208) 555-0112', purpose: 'Gold Loan', amount: 9878, leadOwners: [{ name: 'C', avatar: 'https://picsum.photos/id/1012/50/50' }, { name: 'D', avatar: 'https://picsum.photos/id/1013/50/50' }], progress: 20, stage: 'In progress' },
    { id: 3, name: 'Jane Cooper', avatar: 'https://picsum.photos/id/1029/50/50', email: 'jane.cooper@gmail.com', phone: '(205) 555-0100', purpose: 'Business Loan', amount: 43532, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'B', avatar: 'https://picsum.photos/id/1011/50/50' }], progress: 45, stage: 'Loan Granted' },
    { id: 4, name: 'Imalia Jones', avatar: 'https://picsum.photos/id/1031/50/50', email: 'imalia.jones@gmail.com', phone: '(201) 555-0124', purpose: 'Property Loan', amount: 978878, leadOwners: [{ name: 'E', avatar: 'https://picsum.photos/id/1014/50/50' }], progress: 96, stage: 'In progress' },
    { id: 5, name: 'Linda Miles', avatar: 'https://picsum.photos/id/1032/50/50', email: 'linda.miles@gmail.com', phone: '(307) 555-0133', purpose: 'Education Loan', amount: 9878, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'F', avatar: 'https://picsum.photos/id/1015/50/50' }], progress: 50, stage: 'New' },
    { id: 6, name: 'Bella Sanders', avatar: 'https://picsum.photos/id/1035/50/50', email: 'bella.sanders@gmail.com', phone: '(907) 555-0101', purpose: 'Gold Loan', amount: 13324, leadOwners: [{ name: 'E', avatar: 'https://picsum.photos/id/1014/50/50' }], progress: 42, stage: 'Loan Granted' },
    { id: 7, name: 'Jacob Jones', avatar: 'https://picsum.photos/id/1036/50/50', email: 'jacob.jones@gmail.com', phone: '(907) 555-0101', purpose: 'Home Loan', amount: 13324, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'D', avatar: 'https://picsum.photos/id/1013/50/50' }], progress: 56, stage: 'New' },
    { id: 7, name: 'Jacob Jones', avatar: 'https://picsum.photos/id/1036/50/50', email: 'jacob.jones@gmail.com', phone: '(907) 555-0101', purpose: 'Home Loan', amount: 13324, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'D', avatar: 'https://picsum.photos/id/1013/50/50' }], progress: 56, stage: 'New' },
  ]);

  referrals = signal([
    { id: 1, name: 'Esther Howard', email: 'esther.howard@gmail.com', type: 'Real Estate Agent', referred: 12, commission: '$4,500', status: 'Active' },
    { id: 2, name: 'Cameron Williamson', email: 'cameron.williamson@gmail.com', type: 'Financial Advisor', referred: 8, commission: '$3,200', status: 'Active' },
    { id: 3, name: 'Brooklyn Simmons', email: 'brooklyn.simmons@gmail.com', type: 'Lawyer', referred: 3, commission: '$1,100', status: 'Pending' },
    { id: 4, name: 'Guy Hawkins', email: 'guy.hawkins@gmail.com', type: 'Mortgage Broker', referred: 25, commission: '$12,000', status: 'Active' },
    { id: 5, name: 'Robert Fox', email: 'robert.fox@gmail.com', type: 'Accountant', referred: 5, commission: '$1,800', status: 'Inactive' },
  ]);

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
