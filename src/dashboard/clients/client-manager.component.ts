import { Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FirestoreService, Client, ProjectUpdate } from '../../firestore.service';

@Component({
    selector: 'app-client-manager',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './client-manager.component.html'
})
export class ClientManagerComponent {
    private route = inject(ActivatedRoute);
    private firestoreService = inject(FirestoreService);

    client = signal<Client | null>(null);
    updates = signal<ProjectUpdate[]>([]);
    clientId: string = '';

    newUpdate = {
        content: '',
        type: 'text' as const,
        imageUrl: ''
    };

    constructor() {
        this.route.params.subscribe(params => {
            this.clientId = params['id'];
            if (this.clientId) {
                this.loadClientData();
            }
        });
    }

    async loadClientData() {
        if (!this.clientId) return;
        const clientData = await this.firestoreService.getClient(this.clientId);
        this.client.set(clientData);
        this.loadUpdates();
    }

    async loadUpdates() {
        if (!this.clientId) return;
        const updatesData = await this.firestoreService.getUpdates(this.clientId);
        this.updates.set(updatesData);
    }

    async postUpdate() {
        if (!this.newUpdate.content) return;

        try {
            await this.firestoreService.addUpdate({
                clientId: this.clientId,
                content: this.newUpdate.content,
                type: this.newUpdate.type,
                imageUrl: this.newUpdate.imageUrl,
                timestamp: null // Service adds timestamp
            });
            this.newUpdate.content = '';
            this.newUpdate.imageUrl = '';
            this.loadUpdates();
        } catch (error) {
            console.error("Error posting update:", error);
        }
    }
}
