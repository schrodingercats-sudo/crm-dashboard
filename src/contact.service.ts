import { Injectable, signal } from '@angular/core';

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
  private leads = signal<Lead[]>([
    { id: 1, name: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/40?u=jenny.wilson', email: 'jenny.wilson@gmail.com', phone: '(603) 555-0123', purpose: 'Home Loan', amount: 978878, leadOwners: [{ name: 'A', avatar: 'https://i.pravatar.cc/40?u=owner1' }, { name: 'B', avatar: 'https://i.pravatar.cc/40?u=owner2' }], progress: 70, stage: 'New' },
    { id: 2, name: 'Eleanor Pena', avatar: 'https://i.pravatar.cc/40?u=eleanor.pena', email: 'eleanor.pena@gmail.com', phone: '(208) 555-0112', purpose: 'Gold Loan', amount: 9878, leadOwners: [{ name: 'C', avatar: 'https://i.pravatar.cc/40?u=owner3' }, { name: 'D', avatar: 'https://i.pravatar.cc/40?u=owner4' }, { name: 'E', avatar: 'https://i.pravatar.cc/40?u=owner5' }], progress: 20, stage: 'In progress' },
    { id: 3, name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/40?u=jane.cooper', email: 'jane.cooper@gmail.com', phone: '(205) 555-0100', purpose: 'Business Loan', amount: 43532, leadOwners: [{ name: 'F', avatar: 'https://i.pravatar.cc/40?u=owner6' }, { name: 'G', avatar: 'https://i.pravatar.cc/40?u=owner7' }], progress: 45, stage: 'Loan Granted' },
    { id: 4, name: 'Imalia Jones', avatar: 'https://i.pravatar.cc/40?u=imalia.jones', email: 'imalia.jones@gmail.com', phone: '(201) 555-0124', purpose: 'Property Loan', amount: 978878, leadOwners: [{ name: 'H', avatar: 'https://i.pravatar.cc/40?u=owner8' }], progress: 96, stage: 'In progress' },
    { id: 5, name: 'Linda Miles', avatar: 'https://i.pravatar.cc/40?u=linda.miles', email: 'linda.miles@gmail.com', phone: '(307) 555-0153', purpose: 'Education Loan', amount: 9878, leadOwners: [{ name: 'I', avatar: 'https://i.pravatar.cc/40?u=owner9' }, { name: 'J', avatar: 'https://i.pravatar.cc/40?u=owner10' }], progress: 50, stage: 'New' },
    { id: 6, name: 'Bella Sanders', avatar: 'https://i.pravatar.cc/40?u=bella.sanders', email: 'bella.sanders@gmail.com', phone: '(907) 555-0101', purpose: 'Gold Loan', amount: 13324, leadOwners: [{ name: 'K', avatar: 'https://i.pravatar.cc/40?u=owner11' }], progress: 42, stage: 'Loan Granted' },
    { id: 7, name: 'Jacob Jones', avatar: 'https://i.pravatar.cc/40?u=jacob.jones', email: 'jacob.jones@gmail.com', phone: '(907) 555-0101', purpose: 'Home Loan', amount: 13324, leadOwners: [{ name: 'L', avatar: 'https://i.pravatar.cc/40?u=owner12' }, { name: 'M', avatar: 'https://i.pravatar.cc/40?u=owner13' }], progress: 56, stage: 'New' },
    { id: 8, name: 'John Doe', avatar: '', email: 'john.doe@example.com', phone: '(555) 555-0200', purpose: 'Car Loan', amount: 25000, leadOwners: [], progress: 80, stage: 'In progress' },
    { id: 9, name: 'Alice Smith', avatar: '', email: 'alice.smith@example.com', phone: '(555) 555-0201', purpose: 'Personal Loan', amount: 15000, leadOwners: [], progress: 90, stage: 'Loan Granted' },
  ]);

  getLeads() {
    return this.leads.asReadonly();
  }

  getLead(id: number) {
    return this.leads().find(lead => lead.id === id);
  }
}
