import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';

interface Lead {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  purpose: string;
  amount: number;
  leadOwners: string[];
  progress: number;
  stage: {
    text: string;
    classes: string;
  };
  checked: boolean;
}

type SortKey = 'name' | 'amount';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [NgOptimizedImage, CurrencyPipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  // UI State Signals
  isSidebarCollapsed = signal(false);
  contactsMenuOpen = signal(true);
  dealsMenuOpen = signal(false);
  profileMenuOpen = signal(false);
  activeTab = signal('Leads');

  // Data and Table State Signals
  searchTerm = signal('');
  sortConfig = signal<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  currentPage = signal(1);
  ITEMS_PER_PAGE = 7;

  leads = signal<Lead[]>([
    {
      id: 1,
      name: 'Jenny Wilson',
      avatar: 'https://picsum.photos/seed/1/40/40',
      email: 'jenny.wilson@gmail.com',
      phone: '(603) 555-0123',
      purpose: 'Home Loan',
      amount: 978878,
      leadOwners: ['https://picsum.photos/seed/101/32/32', 'https://picsum.photos/seed/102/32/32'],
      progress: 70,
      stage: { text: 'New', classes: 'bg-purple-100 text-purple-800' },
      checked: false,
    },
    {
      id: 2,
      name: 'Eleanor Pena',
      avatar: 'https://picsum.photos/seed/2/40/40',
      email: 'eleanor.pena@gmail.com',
      phone: '(208) 555-0112',
      purpose: 'Gold Loan',
      amount: 9878,
      leadOwners: ['https://picsum.photos/seed/103/32/32', 'https://picsum.photos/seed/104/32/32', 'https://picsum.photos/seed/105/32/32'],
      progress: 20,
      stage: { text: 'In progress', classes: 'bg-green-100 text-green-800' },
      checked: false,
    },
    {
      id: 3,
      name: 'Jane Cooper',
      avatar: 'https://picsum.photos/seed/3/40/40',
      email: 'jane.cooper@gmail.com',
      phone: '(205) 555-0100',
      purpose: 'Business Loan',
      amount: 43532,
      leadOwners: ['https://picsum.photos/seed/106/32/32', 'https://picsum.photos/seed/107/32/32'],
      progress: 45,
      stage: { text: 'Loan Granted', classes: 'bg-yellow-100 text-yellow-800' },
      checked: false,
    },
    {
      id: 4,
      name: 'Imalia Jones',
      avatar: 'https://picsum.photos/seed/4/40/40',
      email: 'imalia.jones@gmail.com',
      phone: '(201) 555-0124',
      purpose: 'Property Loan',
      amount: 978878,
      leadOwners: ['https://picsum.photos/seed/108/32/32'],
      progress: 96,
      stage: { text: 'In progress', classes: 'bg-green-100 text-green-800' },
      checked: true,
    },
    {
      id: 5,
      name: 'Linda Miles',
      avatar: 'https://picsum.photos/seed/5/40/40',
      email: 'linda.miles@gmail.com',
      phone: '(307) 555-0133',
      purpose: 'Education Loan',
      amount: 9878,
      leadOwners: ['https://picsum.photos/seed/109/32/32', 'https://picsum.photos/seed/110/32/32'],
      progress: 50,
      stage: { text: 'New', classes: 'bg-purple-100 text-purple-800' },
      checked: false,
    },
    {
      id: 6,
      name: 'Bella Sanders',
      avatar: 'https://picsum.photos/seed/6/40/40',
      email: 'bella.sanders@gmail.com',
      phone: '(907) 555-0101',
      purpose: 'Gold Loan',
      amount: 13324,
      leadOwners: ['https://picsum.photos/seed/111/32/32'],
      progress: 42,
      stage: { text: 'Loan Granted', classes: 'bg-yellow-100 text-yellow-800' },
      checked: false,
    },
    {
      id: 7,
      name: 'Jacob Jones',
      avatar: 'https://picsum.photos/seed/7/40/40',
      email: 'jacob.jones@gmail.com',
      phone: '(907) 555-0101',
      purpose: 'Home Loan',
      amount: 13324,
      leadOwners: ['https://picsum.photos/seed/112/32/32', 'https://picsum.photos/seed/113/32/32'],
      progress: 56,
      stage: { text: 'New', classes: 'bg-purple-100 text-purple-800' },
      checked: false,
    },
  ]);

  // Computed Signals for derived data
  filteredLeads = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.leads();
    return this.leads().filter(
      (lead) =>
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.purpose.toLowerCase().includes(term)
    );
  });
  
  sortedLeads = computed(() => {
    const { key, direction } = this.sortConfig();
    const sorted = [...this.filteredLeads()]; // Create a new array
    sorted.sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  });

  totalPages = computed(() => Math.ceil(this.sortedLeads().length / this.ITEMS_PER_PAGE));
  
  paginatedLeads = computed(() => {
    const start = (this.currentPage() - 1) * this.ITEMS_PER_PAGE;
    const end = start + this.ITEMS_PER_PAGE;
    return this.sortedLeads().slice(start, end);
  });
  
  allChecked = computed(() => this.paginatedLeads().length > 0 && this.paginatedLeads().every(l => l.checked));

  // Methods
  toggleSidebar() { this.isSidebarCollapsed.update(v => !v); }
  toggleContactsMenu() { this.contactsMenuOpen.update(v => !v); }
  toggleDealsMenu() { this.dealsMenuOpen.update(v => !v); }
  toggleProfileMenu() { this.profileMenuOpen.update(v => !v); }
  setActiveTab(tab: string) { this.activeTab.set(tab); }

  updateSearchTerm(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1); // Reset to first page on new search
  }
  
  setSort(key: SortKey) {
    this.sortConfig.update(config => {
      if (config.key === key) {
        return { ...config, direction: config.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  previousPage() { this.goToPage(this.currentPage() - 1); }
  nextPage() { this.goToPage(this.currentPage() + 1); }
  
  toggleLeadChecked(leadId: number) {
    this.leads.update(leads => 
      leads.map(l => l.id === leadId ? {...l, checked: !l.checked} : l)
    );
  }

  toggleAllChecked() {
    const currentCheckedState = this.allChecked();
    const paginatedIds = this.paginatedLeads().map(l => l.id);
    this.leads.update(leads => 
      leads.map(l => paginatedIds.includes(l.id) ? {...l, checked: !currentCheckedState} : l)
    );
  }
}
