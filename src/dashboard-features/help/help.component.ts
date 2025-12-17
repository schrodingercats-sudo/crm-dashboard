import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-help',
  templateUrl: './help.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class HelpComponent {
  faqs = signal([
    {
      question: 'How do I add a new lead?',
      answer: 'Go to the Leads page and click the "Add Lead" button in the top right corner.',
      isOpen: false
    },
    {
      question: 'Can I change my password?',
      answer: 'Yes, go to Settings > Security to update your password.',
      isOpen: false
    },
    {
      question: 'How do I integrate with Slack?',
      answer: 'Navigate to the Integration page, find Slack in the list, and click "Connect".',
      isOpen: false
    }
  ]);

  contactForm = signal({
    subject: '',
    message: ''
  });

  toggleFaq(index: number) {
    this.faqs.update(items =>
      items.map((item, i) => i === index ? { ...item, isOpen: !item.isOpen } : item)
    );
  }

  submitSupportRequest() {
    console.log('Sending support request:', this.contactForm());
    alert('Support request sent! We will get back to you shortly.');
    this.contactForm.set({ subject: '', message: '' });
  }

  updateSubject(subject: string) {
    this.contactForm.update(f => ({ ...f, subject }));
  }

  updateMessage(message: string) {
    this.contactForm.update(f => ({ ...f, message }));
  }
}
