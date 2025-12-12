// This component is no longer used in the application.
// The default route now points to the DashboardComponent.
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class LandingComponent {}
