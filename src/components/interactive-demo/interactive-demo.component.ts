import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GeminiService } from '../../gemini.service';

@Component({
  selector: 'app-interactive-demo',
  templateUrl: './interactive-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveDemoComponent {
  private geminiService = inject(GeminiService);

  prompt = signal<string>('');
  response = signal<string>('');
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  suggestedPrompts = [
    'Draft a follow-up email to a lead who missed a demo.',
    'Summarize the key takeaways from the Q3 sales report.',
    'Generate 5 subject lines for an email campaign about a new feature.',
    'Create a list of potential talking points for a call with a new prospect.',
  ];

  onPromptInput(event: Event) {
    this.prompt.set((event.target as HTMLTextAreaElement).value);
  }

  useSuggestion(suggestion: string) {
    this.prompt.set(suggestion);
    this.generate();
  }

  async generate() {
    if (!this.prompt().trim() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.response.set('');
    this.error.set('');

    try {
      const result = await this.geminiService.generateContent(this.prompt());
      this.response.set(result);
    } catch (e: unknown) {
      this.error.set(
        e instanceof Error ? e.message : 'An unknown error occurred.'
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}
