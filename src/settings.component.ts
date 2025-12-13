import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  activeTab = signal('Profile');

  setActiveTab(tab: string, event: Event) {
    event.preventDefault();
    this.activeTab.set(tab);
  }
}
