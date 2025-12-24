import { Injectable, signal, inject } from '@angular/core';
import { DataAccessService } from './data-access.service';

export interface Deal {
    id: number;
    title: string;
    company: string;
    value: number;
    stage: string;
    ownerAvatar: string;
    type: string;
    typeColor: string;
    ownerEmail?: string; // Added for data access control
    createdBy?: string;  // Added for data access control
}

@Injectable({
    providedIn: 'root',
})
export class DealService {
    private dataAccessService = inject(DataAccessService);
    private allDeals = signal<Deal[]>([]);
    private filteredDeals = signal<Deal[]>([]);
    isLoading = signal(false);

    constructor() {
        this.initializeMockData();
    }

    private initializeMockData() {
        // Mock data with different owners
        const mockDeals: Deal[] = [
            {
                id: 1,
                title: 'Enterprise Software License',
                company: 'TechCorp Solutions',
                value: 125000,
                stage: 'Negotiation',
                ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                type: 'Software',
                typeColor: 'bg-blue-100 text-blue-800',
                ownerEmail: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            },
            {
                id: 2,
                title: 'Marketing Campaign',
                company: 'Digital Marketing Pro',
                value: 45000,
                stage: 'Proposal',
                ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                type: 'Marketing',
                typeColor: 'bg-green-100 text-green-800',
                ownerEmail: 'user@example.com',
                createdBy: 'user@example.com'
            },
            {
                id: 3,
                title: 'Cloud Infrastructure',
                company: 'CloudTech Inc',
                value: 89000,
                stage: 'Closed Won',
                ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                type: 'Infrastructure',
                typeColor: 'bg-purple-100 text-purple-800',
                ownerEmail: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            },
            {
                id: 4,
                title: 'Mobile App Development',
                company: 'AppDev Studios',
                value: 67000,
                stage: 'Discovery',
                ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                type: 'Development',
                typeColor: 'bg-yellow-100 text-yellow-800',
                ownerEmail: 'user@example.com',
                createdBy: 'user@example.com'
            },
            {
                id: 5,
                title: 'Data Analytics Platform',
                company: 'DataInsights Corp',
                value: 156000,
                stage: 'Negotiation',
                ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                type: 'Analytics',
                typeColor: 'bg-red-100 text-red-800',
                ownerEmail: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            },
            {
                id: 6,
                title: 'Security Audit',
                company: 'SecureIT Solutions',
                value: 23000,
                stage: 'Qualified',
                ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                type: 'Security',
                typeColor: 'bg-orange-100 text-orange-800',
                ownerEmail: 'user@example.com',
                createdBy: 'user@example.com'
            },
            {
                id: 7,
                title: 'ERP Implementation',
                company: 'Business Systems Ltd',
                value: 234000,
                stage: 'Proposal',
                ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                type: 'ERP',
                typeColor: 'bg-indigo-100 text-indigo-800',
                ownerEmail: 'pratham.solanki30@gmail.com',
                createdBy: 'pratham.solanki30@gmail.com'
            }
        ];

        this.allDeals.set(mockDeals);
        this.applyDataFiltering();
    }

    private applyDataFiltering() {
        const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
        const filtered = this.dataAccessService.filterDataForUser(this.allDeals(), currentUserEmail);
        this.filteredDeals.set(filtered);
    }

    getDeals() {
        return this.filteredDeals.asReadonly();
    }

    getAllDeals() {
        // Only admin can access all deals
        const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
        if (this.dataAccessService.canManageAllData(currentUserEmail)) {
            return this.allDeals.asReadonly();
        }
        return this.filteredDeals.asReadonly();
    }

    async addDeal(deal: Omit<Deal, 'id'>) {
        try {
            const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
            const dealWithOwner = {
                ...deal,
                id: Date.now(), // Simple ID generation
                ownerEmail: currentUserEmail,
                createdBy: currentUserEmail
            };
            
            this.allDeals.update(deals => [...deals, dealWithOwner]);
            this.applyDataFiltering();
        } catch (error) {
            console.error('Failed to add deal:', error);
            throw error;
        }
    }

    // Method to refresh data filtering when user changes
    refreshDataFiltering() {
        this.applyDataFiltering();
    }
}
