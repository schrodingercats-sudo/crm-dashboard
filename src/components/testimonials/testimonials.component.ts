import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  users = [
    { name: 'Odessa Mira', group: 'Altria Group', imageUrl: 'https://picsum.photos/id/1/200/200' },
    { name: 'Staci O', group: 'Campbell', imageUrl: 'https://picsum.photos/id/2/200/200' },
  ];
}