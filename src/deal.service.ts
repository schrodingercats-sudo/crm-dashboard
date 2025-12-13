import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Deal {
    id: number;
    title: string;
    company: string;
    value: number;
    stage: string;
    ownerAvatar: string;
    type: string;
    typeColor: string;
}

@Injectable({
    providedIn: 'root',
})
export class DealService {
    private http = inject(HttpClient);
    private deals = signal<Deal[]>([]);

    constructor() {
        this.fetchDeals();
    }

    private async fetchDeals() {
        try {
            const deals = await firstValueFrom(this.http.get<Deal[]>('/api/deals'));
            this.deals.set(deals);
        } catch (error) {
            console.error('Failed to fetch deals:', error);
        }
    }

    getDeals() {
        return this.deals.asReadonly();
    }

    async addDeal(deal: Omit<Deal, 'id'>) {
        try {
            const newDeal = await firstValueFrom(this.http.post<Deal>('/api/deals', deal));
            this.deals.update(deals => [...deals, newDeal]);
        } catch (error) {
            console.error('Failed to add deal:', error);
        }
    }
}
