import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class SettingsComponent {
  private settingsService = inject(SettingsService);

  // Expose signals from service
  profile = computed(() => this.settingsService.settings().profile);
  notifications = computed(() => this.settingsService.settings().notifications);
  appearance = computed(() => this.settingsService.settings().appearance);

  saveSettings() {
    console.log('Settings are auto-saved via effects in SettingsService.');
    // Optional: Show a toast or notification
    alert('Settings saved successfully!');
  }

  updateName(name: string) {
    this.settingsService.updateProfile({ name });
  }

  updateEmail(email: string) {
    this.settingsService.updateProfile({ email });
  }

  updateBio(bio: string) {
    this.settingsService.updateProfile({ bio });
  }

  updateEmailNotification(email: boolean) {
    this.settingsService.updateNotifications({ email });
  }

  updatePushNotification(push: boolean) {
    this.settingsService.updateNotifications({ push });
  }

  updateTheme(theme: string) {
    // Cast string to union type for safety, though template sends correct values
    this.settingsService.updateAppearance({ theme: theme as 'light' | 'dark' });
  }
}
