import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { NgOptimizedImage } from '@angular/common';
import { ContactService, Lead } from './contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailComponent {
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);

  private leadId$ = this.route.paramMap.pipe(map(params => Number(params.get('id'))));
  
  lead = toSignal(
      this.leadId$.pipe(
          map(id => this.contactService.getLead(id))
      )
  );
  
  getStageClass(stage: Lead['stage'] | undefined): string {
    if (!stage) return 'bg-gray-100 text-gray-700';
    switch (stage) {
      case 'New':
        return 'bg-purple-100 text-purple-800';
      case 'In progress':
        return 'bg-green-100 text-green-800';
      case 'Loan Granted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}