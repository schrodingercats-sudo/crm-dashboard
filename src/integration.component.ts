import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationComponent {
  integrations = signal([
    { id: 'slack', name: 'Slack', description: 'Receive notifications and updates directly in your Slack channels.', connected: true, iconColor: 'bg-blue-50', iconClass: 'text-blue-600' },
    { id: 'gmail', name: 'Gmail', description: 'Sync your emails and contacts directly with the CRM.', connected: false, iconColor: 'bg-red-50', iconClass: 'text-red-600' },
    { id: 'gcal', name: 'Google Calendar', description: 'Schedule meetings and view your calendar events.', connected: false, iconColor: 'bg-yellow-50', iconClass: 'text-yellow-600' },
    { id: 'hubspot', name: 'HubSpot', description: 'Sync contacts and deals with HubSpot CRM.', connected: false, iconColor: 'bg-orange-50', iconClass: 'text-orange-600' },
  ]);

  toggleConnection(id: string) {
    this.integrations.update(integrations => integrations.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
  }
}
