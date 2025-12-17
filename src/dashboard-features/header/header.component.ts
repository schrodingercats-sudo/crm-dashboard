import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, inject, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  menuToggle = output<void>();

  showNotifications = signal(false);
  showUserMenu = signal(false);

  notifications = signal([
    { id: 1, text: 'New lead assigned to you: Sarah Jones', time: '5m ago', read: false },
    { id: 2, text: 'Meeting with Dev team at 3 PM', time: '1h ago', read: false },
    { id: 3, text: 'Your export is ready to download', time: '2h ago', read: true },
  ]);

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  userProfile = computed(() => {
    const user = this.authService.currentUser();
    if (!user) {
      return { photoURL: null, initials: '' };
    }

    const photoURL = user.photoURL;
    let initials = '';

    if (user.displayName) {
      initials = user.displayName.charAt(0).toUpperCase();
    } else if (user.email) {
      initials = user.email.charAt(0).toUpperCase();
    }

    return { photoURL, initials };
  });

  toggleNotifications() {
    this.showNotifications.update(v => !v);
    if (this.showNotifications()) {
      this.showUserMenu.set(false);
    }
  }

  toggleUserMenu() {
    this.showUserMenu.update(v => !v);
    if (this.showUserMenu()) {
      this.showNotifications.set(false);
    }
  }

  markAsRead(id: number) {
    this.notifications.update(items =>
      items.map(item => item.id === id ? { ...item, read: true } : item)
    );
  }

  logout() {
    this.authService.logout();
  }
}
