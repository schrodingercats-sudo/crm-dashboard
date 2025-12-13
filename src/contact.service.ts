import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private leads = signal<Lead[]>([]);

  constructor() {
    this.fetchLeads();
  }

  private async fetchLeads() {
    try {
      const leads = await firstValueFrom(this.http.get<Lead[]>('/api/contacts'));
      this.leads.set(leads);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    }
  }

  getLeads() {
    return this.leads.asReadonly();
  }

  getLead(id: number) {
    return this.leads().find(lead => lead.id === id);
  }
}
