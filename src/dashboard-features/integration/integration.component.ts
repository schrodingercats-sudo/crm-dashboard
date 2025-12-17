import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface Integration {
  id: number;
  name: string;
  icon: string;
  description: string;
  status: 'Connected' | 'Disconnected';
  category: string;
}

@Component({
  standalone: true,
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IntegrationComponent {
  integrations = signal<Integration[]>([
    {
      id: 1,
      name: 'Slack',
      icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png',
      description: 'Communicate with your team in real-time.',
      status: 'Connected',
      category: 'Communication'
    },
    {
      id: 2,
      name: 'Gmail',
      icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
      description: 'Sync your emails and contacts automatically.',
      status: 'Disconnected',
      category: 'Email'
    },
    {
      id: 3,
      name: 'Zoom',
      icon: 'https://cdn-icons-png.flaticon.com/512/4401/4401470.png',
      description: 'Schedule and join video meetings directly.',
      status: 'Disconnected',
      category: 'Video Conferencing'
    },
    {
      id: 4,
      name: 'Stripe',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968382.png',
      description: 'Process payments and manage subscriptions.',
      status: 'Connected',
      category: 'Payment'
    },
    {
      id: 5,
      name: 'HubSpot',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968872.png',
      description: 'Connect your CRM for better lead management.',
      status: 'Disconnected',
      category: 'CRM'
    }
  ]);

  toggleIntegration(id: number) {
    this.integrations.update(integrations =>
      integrations.map(integration =>
        integration.id === id
          ? { ...integration, status: integration.status === 'Connected' ? 'Disconnected' : 'Connected' }
          : integration
      )
    );
  }
}
