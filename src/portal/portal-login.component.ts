import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';

@Component({
    selector: 'app-portal-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './portal-login.component.html'
})
export class PortalLoginComponent {
    private firestoreService = inject(FirestoreService);
    private router = inject(Router);

    username = '';
    password = '';
    error = '';
    loading = false;

    async login() {
        this.loading = true;
        this.error = '';

        try {
            const client = await this.firestoreService.loginClient(this.username, this.password);
            if (client && client.id) {
                localStorage.setItem('portal_client_id', client.id);
                this.router.navigate(['/portal/dashboard']);
            } else {
                this.error = 'Invalid credentials';
            }
        } catch (e) {
            this.error = 'Login error occurred';
        } finally {
            this.loading = false;
        }
    }
}
