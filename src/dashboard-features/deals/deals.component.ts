
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsComponent {
  stages = ['New', 'Qualification', 'Negotiation', 'Won'];

  deals = signal([
    { id: 1, title: 'Acme Corp License', value: 15000, company: 'Acme Corp', stage: 'New', owner: 'Alice' },
    { id: 2, title: 'Global Tech Contract', value: 45000, company: 'Global Tech', stage: 'Qualification', owner: 'Bob' },
    { id: 3, title: 'Startup Launch Pack', value: 5000, company: 'NextGen', stage: 'New', owner: 'Charlie' },
    { id: 4, title: 'Enterprise Plan', value: 85000, company: 'MegaCorp', stage: 'Negotiation', owner: 'Alice' },
    { id: 5, title: 'Small Biz Update', value: 2500, company: 'LocalShop', stage: 'Won', owner: 'Bob' },
    { id: 6, title: 'Consulting Retainer', value: 12000, company: 'ConsultEx', stage: 'Qualification', owner: 'Charlie' },
  ]);

  dealsByStage = computed(() => {
    const grouped: { [key: string]: any[] } = {};
    this.stages.forEach(stage => grouped[stage] = []);
    this.deals().forEach(deal => {
      if (grouped[deal.stage]) {
        grouped[deal.stage].push(deal);
      }
    });
    return grouped;
  });
}
