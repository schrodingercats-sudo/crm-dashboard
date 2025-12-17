
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface Lead {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  purpose: string;
  amount: number;
  leadOwners: { name: string; avatar: string }[];
  progress: number;
  stage: 'New' | 'In progress' | 'Loan Granted';
}

@Component({
  standalone: true,
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  activeTab = signal('leads');

  leads = signal<Lead[]>([
    { id: 1, name: 'Jenny Wilson', avatar: 'https://picsum.photos/id/1027/50/50', email: 'jenny.wilson@gmail.com', phone: '(603) 555-0123', purpose: 'Home Loan', amount: 978878, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'B', avatar: 'https://picsum.photos/id/1011/50/50' }], progress: 70, stage: 'New' },
    { id: 2, name: 'Eleanor Pena', avatar: 'https://picsum.photos/id/1028/50/50', email: 'eleanor.pena@gmail.com', phone: '(208) 555-0112', purpose: 'Gold Loan', amount: 9878, leadOwners: [{ name: 'C', avatar: 'https://picsum.photos/id/1012/50/50' }, { name: 'D', avatar: 'https://picsum.photos/id/1013/50/50' }], progress: 20, stage: 'In progress' },
    { id: 3, name: 'Jane Cooper', avatar: 'https://picsum.photos/id/1029/50/50', email: 'jane.cooper@gmail.com', phone: '(205) 555-0100', purpose: 'Business Loan', amount: 43532, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'B', avatar: 'https://picsum.photos/id/1011/50/50' }], progress: 45, stage: 'Loan Granted' },
    { id: 4, name: 'Imalia Jones', avatar: 'https://picsum.photos/id/1031/50/50', email: 'imalia.jones@gmail.com', phone: '(201) 555-0124', purpose: 'Property Loan', amount: 978878, leadOwners: [{ name: 'E', avatar: 'https://picsum.photos/id/1014/50/50' }], progress: 96, stage: 'In progress' },
    { id: 5, name: 'Linda Miles', avatar: 'https://picsum.photos/id/1032/50/50', email: 'linda.miles@gmail.com', phone: '(307) 555-0133', purpose: 'Education Loan', amount: 9878, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'F', avatar: 'https://picsum.photos/id/1015/50/50' }], progress: 50, stage: 'New' },
    { id: 6, name: 'Bella Sanders', avatar: 'https://picsum.photos/id/1035/50/50', email: 'bella.sanders@gmail.com', phone: '(907) 555-0101', purpose: 'Gold Loan', amount: 13324, leadOwners: [{ name: 'E', avatar: 'https://picsum.photos/id/1014/50/50' }], progress: 42, stage: 'Loan Granted' },
    { id: 7, name: 'Jacob Jones', avatar: 'https://picsum.photos/id/1036/50/50', email: 'jacob.jones@gmail.com', phone: '(907) 555-0101', purpose: 'Home Loan', amount: 13324, leadOwners: [{ name: 'A', avatar: 'https://picsum.photos/id/1005/50/50' }, { name: 'D', avatar: 'https://picsum.photos/id/1013/50/50' }], progress: 56, stage: 'New' },
  ]);

  stageClasses = computed(() => {
    return (stage: 'New' | 'In progress' | 'Loan Granted') => {
      switch (stage) {
        case 'New':
          return 'bg-purple-100 text-purple-800';
        case 'In progress':
          return 'bg-green-100 text-green-800';
        case 'Loan Granted':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  });
}
