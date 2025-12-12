import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  faqItems = signal<FaqItem[]>([
    {
      question: 'What is Pipeliner?',
      answer: 'Designed for today\'s fast-moving teams, Pipeliner is a CRM that bends to your needs. Its flexible data model and easy-to-build workflows let you shape the platform around your GTM...',
      isOpen: true,
    },
    {
      question: 'Can Pipeliner in Dark Mode?',
      answer: 'Yes! Pipeliner supports a sleek and easy-on-the-eyes dark mode. You can toggle it in your user settings.',
      isOpen: false,
    },
    {
      question: 'Manage Member, Workspace, and Billing',
      answer: 'You can manage all aspects of your workspace, members, and billing from the "Settings" page in your Pipeliner dashboard.',
      isOpen: false,
    },
    {
      question: 'Import & Export My Data in Pipeliner',
      answer: 'Pipeliner offers robust data import and export tools. You can easily import from CSV or other CRM systems, and export your data at any time.',
      isOpen: false,
    },
    {
      question: 'How to Navigate and Build Workflows?',
      answer: 'Our intuitive drag-and-drop workflow builder makes it simple to create powerful automations. Check out our video tutorials in the "Resources" section to get started.',
      isOpen: false,
    },
     {
      question: 'Pipeliner Chrome Extension',
      answer: 'Access and manage your workspace from anywhere on the web or Gmail with the Pipeliner Chrome extension. Add or update records and lists, view relationship data, discover useful...',
      isOpen: false,
    },
  ]);

  toggle(index: number): void {
    this.faqItems.update(items => {
      return items.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: !item.isOpen };
        }
        // Optional: close other items when one is opened
        // return { ...item, isOpen: false };
        return item; // Keep others as they are
      });
    });
  }
}