import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FirestoreService, Client } from '../../firestore.service';

@Component({
    selector: 'app-clients',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './clients.component.html'
})
export class ClientsComponent {
    private firestoreService = inject(FirestoreService);

    clients = signal<Client[]>([]);
    showAddClientModal = false;

    // Stats
    stats = signal({
        totalClients: 0,
        activeProjects: 0,
        recentUpdates: 0
    });

    // Form Data
    newClient = {
        name: '',
        username: '',
        password: '',
        projectIdea: ''
    };

    constructor() {
        this.loadClients();
    }

    async loadClients() {
        const data = await this.firestoreService.getClients();
        this.clients.set(data);
        this.calculateStats(data);
    }

    calculateStats(clients: Client[]) {
        this.stats.set({
            totalClients: clients.length,
            activeProjects: clients.length, // Placeholder logic
            recentUpdates: 0 // Placeholder logic
        });
    }

    async createClient() {
        if (!this.newClient.name || !this.newClient.username || !this.newClient.password) return;

        try {
            await this.firestoreService.addClient(this.newClient as Client);
            this.closeAddClientModal();
            this.loadClients();
        } catch (error) {
            alert('Error creating client (Username might exist)');
        }
    }

    openAddClientModal() {
        this.showAddClientModal = true;
        // Reset form for new entry
        this.newClient = { name: '', username: '', password: '', projectIdea: '' };
    }

    closeAddClientModal() {
        this.showAddClientModal = false;
    }
}
