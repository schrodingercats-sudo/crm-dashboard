import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { DealService } from './deal.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  imports: [NgOptimizedImage, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsComponent {
  private dealService = inject(DealService);
  isAddDealModalOpen = signal(false);

  deals = this.dealService.getDeals();

  getDealsByStage(stage: string) {
    return this.deals().filter(d => d.stage === stage);
  }

  getStageCount(stage: string) {
    return this.getDealsByStage(stage).length;
  }

  openAddDealModal() {
    this.isAddDealModalOpen.set(true);
  }

  closeAddDealModal() {
    this.isAddDealModalOpen.set(false);
  }

  addDeal(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const company = (form.elements.namedItem('company') as HTMLInputElement).value;
    const value = parseFloat((form.elements.namedItem('value') as HTMLInputElement).value);

    const newDeal = {
      title,
      company,
      value,
      stage: 'New',
      ownerAvatar: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 100)}`,
      type: 'Software', // Default
      typeColor: 'bg-blue-100 text-blue-800'
    };

    this.dealService.addDeal(newDeal);
    this.closeAddDealModal();
  }
}
