import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LucideAngularModule, Database, Clock, Layout } from 'lucide-angular';

@Component({
  selector: 'app-data-model-feature',
  templateUrl: './data-model-feature.component.html',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataModelFeatureComponent {
  readonly DatabaseIcon = Database;
  readonly ClockIcon = Clock;
  readonly LayoutIcon = Layout;
}