import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { DealService, Deal } from '../../deal.service';
import { DataAccessService } from '../../data-access.service';
import { NavigationService } from '../../navigation.service';
import { AddDealDialogComponent } from '../../components/add-deal-dialog/add-deal-dialog.component';

@Component({
  standalone: true,
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AddDealDialogComponent]
})
export class DealsComponent {
  dealService = inject(DealService);
  dataAccessService = inject(DataAccessService);
  navigationService = inject(NavigationService);
  
  stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed Won'];
  showAddDealDialog = signal(false);

  // Get role-appropriate data
  currentRole = this.navigationService.currentRole;
  deals = this.dealService.getDeals();

  dealsByStage = computed(() => {
    const grouped: { [key: string]: any[] } = {};
    this.stages.forEach(stage => grouped[stage] = []);
    
    this.deals().forEach(deal => {
      const stage = deal.stage;
      if (grouped[stage]) {
        grouped[stage].push(deal);
      } else {
        // Map similar stages or put in a default category
        if (stage === 'Qualified') {
          grouped['Discovery'].push(deal);
        } else if (stage === 'Won') {
          grouped['Closed Won'].push(deal);
        } else {
          // If no mapping found, put in Discovery as default
          grouped['Discovery'].push(deal);
        }
      }
    });
    return grouped;
  });

  // Check if user can manage all data (admin only)
  canManageAllData = computed(() => {
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    return this.dataAccessService.canManageAllData(currentUserEmail);
  });

  // Role-based page title
  pageTitle = computed(() => {
    const role = this.currentRole();
    return role === 'admin' ? 'All Deals' : 'My Deals';
  });

  // Role-based statistics
  dealStats = computed(() => {
    const allDeals = this.deals();
    const totalValue = allDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);
    const wonDeals = allDeals.filter(deal => deal.stage === 'Won');
    const wonValue = wonDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);
    
    return {
      total: allDeals.length,
      totalValue: totalValue,
      won: wonDeals.length,
      wonValue: wonValue,
      winRate: allDeals.length > 0 ? Math.round((wonDeals.length / allDeals.length) * 100) : 0
    };
  });

  // Get stage-specific styling
  getStageColor(stage: string): string {
    const colors: { [key: string]: string } = {
      'New': 'bg-blue-100 text-blue-800',
      'Qualification': 'bg-yellow-100 text-yellow-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Won': 'bg-green-100 text-green-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  }
}
