import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, Database, Clock, Layout } from 'lucide-angular';

@Component({
  selector: 'app-data-model-feature',
  templateUrl: './data-model-feature.component.html',
  imports: [NgOptimizedImage, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataModelFeatureComponent {
  readonly DatabaseIcon = Database;
  readonly ClockIcon = Clock;
  readonly LayoutIcon = Layout;
}