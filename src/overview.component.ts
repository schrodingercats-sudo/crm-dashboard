import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  template: `
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900">Overview</h1>
      <p class="mt-2 text-gray-600">A high-level overview of your leads, deals, and performance metrics will be displayed here.</p>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {}
