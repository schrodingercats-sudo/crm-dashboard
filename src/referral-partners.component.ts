import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';

@Component({
    selector: 'app-referral-partners',
    templateUrl: './referral-partners.component.html',
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralPartnersComponent {
    private navigationService = inject(NavigationService);

    // Get role-based routes for navigation
    currentRole = this.navigationService.currentRole;
    baseRoute = computed(() => {
        const role = this.currentRole();
        return role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    });

    partners = signal([
        { id: 1, name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', phone: '(555) 123-4567', status: 'Active', referrals: 12 },
        { id: 2, name: 'Marketing Gurus', email: 'hello@marketinggurus.com', phone: '(555) 987-6543', status: 'Active', referrals: 8 },
        { id: 3, name: 'Legal Advisors LLP', email: 'info@legaladvisors.com', phone: '(555) 555-5555', status: 'Inactive', referrals: 2 },
    ]);
}
