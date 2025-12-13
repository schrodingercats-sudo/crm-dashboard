import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
      <p class="mt-2 text-gray-600">Manage your account, workspace, billing, and other application settings.</p>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
