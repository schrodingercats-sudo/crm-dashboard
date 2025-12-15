import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirestoreService, Client, ProjectUpdate } from '../firestore.service';

@Component({
    selector: 'app-portal-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './portal-dashboard.component.html'
})
export class PortalDashboardComponent {
    private firestoreService = inject(FirestoreService);
    private router = inject(Router);

    client = signal<Client | null>(null);
    updates = signal<ProjectUpdate[]>([]);
    loading = true;

    constructor() {
        this.loadData();
    }

    async loadData() {
        const clientId = localStorage.getItem('portal_client_id');
        if (!clientId) {
            this.router.navigate(['/portal/login']);
            return;
        }

        try {
            const clientData = await this.firestoreService.getClient(clientId);
            if (clientData) {
                this.client.set(clientData);
                const updatesData = await this.firestoreService.getUpdates(clientId);
                this.updates.set(updatesData);
            } else {
                this.logout();
            }
        } catch (e) {
            console.error('Error loading portal data', e);
        } finally {
            this.loading = false;
        }
    }

    logout() {
        localStorage.removeItem('portal_client_id');
        this.router.navigate(['/portal/login']);
    }
}
