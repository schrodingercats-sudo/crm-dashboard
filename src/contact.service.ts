import { Injectable, signal, inject } from '@angular/core';
import { DataAccessService } from './data-access.service';
import { AuthService } from './auth.service';

export interface Lead {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  purpose: string;
  amount: number;
  leadOwners: { name: string; avatar: string }[];
  progress: number;
  stage: 'New' | 'In progress' | 'Loan Granted';
  ownerEmail?: string; // Added for data access control
  createdBy?: string;  // Added for data access control
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private dataAccessService = inject(DataAccessService);
  private authService = inject(AuthService);
  private allLeads = signal<Lead[]>([]);
  private filteredLeads = signal<Lead[]>([]);
  isLoading = signal(false);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock data with different owners
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        purpose: 'Home Purchase',
        amount: 450000,
        leadOwners: [{ name: 'Admin User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }],
        progress: 75,
        stage: 'In progress',
        ownerEmail: 'pratham.solanki30@gmail.com',
        createdBy: 'pratham.solanki30@gmail.com'
      },
      {
        id: '2',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        email: 'michael.chen@example.com',
        phone: '+1 (555) 234-5678',
        purpose: 'Refinancing',
        amount: 320000,
        leadOwners: [{ name: 'Regular User', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }],
        progress: 45,
        stage: 'New',
        ownerEmail: 'user@example.com',
        createdBy: 'user@example.com'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        email: 'emily.rodriguez@example.com',
        phone: '+1 (555) 345-6789',
        purpose: 'Investment Property',
        amount: 680000,
        leadOwners: [{ name: 'Admin User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }],
        progress: 90,
        stage: 'Loan Granted',
        ownerEmail: 'pratham.solanki30@gmail.com',
        createdBy: 'pratham.solanki30@gmail.com'
      },
      {
        id: '4',
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        email: 'david.wilson@example.com',
        phone: '+1 (555) 456-7890',
        purpose: 'First Time Buyer',
        amount: 280000,
        leadOwners: [{ name: 'Regular User', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }],
        progress: 30,
        stage: 'New',
        ownerEmail: 'user@example.com',
        createdBy: 'user@example.com'
      },
      {
        id: '5',
        name: 'Lisa Thompson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        email: 'lisa.thompson@example.com',
        phone: '+1 (555) 567-8901',
        purpose: 'Commercial Loan',
        amount: 1200000,
        leadOwners: [{ name: 'Admin User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }],
        progress: 60,
        stage: 'In progress',
        ownerEmail: 'pratham.solanki30@gmail.com',
        createdBy: 'pratham.solanki30@gmail.com'
      },
      {
        id: '6',
        name: 'James Anderson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        email: 'james.anderson@example.com',
        phone: '+1 (555) 678-9012',
        purpose: 'Home Equity Loan',
        amount: 85000,
        leadOwners: [{ name: 'Regular User', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }],
        progress: 20,
        stage: 'New',
        ownerEmail: 'user@example.com',
        createdBy: 'user@example.com'
      }
    ];

    this.allLeads.set(mockLeads);
    this.applyDataFiltering();
  }

  private applyDataFiltering() {
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    const filtered = this.dataAccessService.filterDataForUser(this.allLeads(), currentUserEmail);
    this.filteredLeads.set(filtered);
  }

  getLeads() {
    return this.filteredLeads.asReadonly();
  }

  getAllLeads() {
    // Only admin can access all leads
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    if (this.dataAccessService.canManageAllData(currentUserEmail)) {
      return this.allLeads.asReadonly();
    }
    return this.filteredLeads.asReadonly();
  }

  getLead(id: string) {
    return this.filteredLeads().find(lead => lead.id === id);
  }

  async addContact(contact: Omit<Lead, 'id'>) {
    try {
      const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
      const contactWithOwner = {
        ...contact,
        id: Date.now().toString(), // Simple ID generation
        ownerEmail: currentUserEmail,
        createdBy: currentUserEmail
      };
      
      this.allLeads.update(leads => [contactWithOwner, ...leads]);
      this.applyDataFiltering();
    } catch (error) {
      console.error('Failed to add contact:', error);
      throw error;
    }
  }

  // Method to refresh data filtering when user changes
  refreshDataFiltering() {
    this.applyDataFiltering();
  }
}
