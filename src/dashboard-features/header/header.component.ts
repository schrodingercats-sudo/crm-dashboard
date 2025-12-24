import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, inject, computed, signal, HostListener } from '@angular/core';
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
  imageLoadError = signal(false);

  notifications = signal([
    { id: 1, text: 'New lead assigned to you: Sarah Jones', time: '5m ago', read: false },
    { id: 2, text: 'Meeting with Dev team at 3 PM', time: '1h ago', read: false },
    { id: 3, text: 'Your export is ready to download', time: '2h ago', read: true },
  ]);

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  userProfile = computed(() => {
    const user = this.authService.currentUser();
    if (!user) {
      this.imageLoadError.set(false); // Reset error when no user
      return { photoURL: null, initials: '', email: '' };
    }

    // Get photoURL and handle potential null/undefined cases
    let photoURL = user.photoURL;
    
    // If there was an image loading error, don't show the photo
    if (this.imageLoadError()) {
      photoURL = null;
    }
    
    // Sometimes Google returns a photoURL but it might be empty string or invalid
    if (photoURL === '' || photoURL === null || photoURL === undefined) {
      photoURL = null;
    }

    const email = user.email || '';
    let initials = '';

    if (user.displayName) {
      initials = user.displayName.charAt(0).toUpperCase();
    } else if (user.email) {
      initials = user.email.charAt(0).toUpperCase();
    }

    return { photoURL, initials, email };
  });

  // Computed property for dynamic routes based on user role
  dashboardRoutes = computed(() => {
    const user = this.authService.currentUser();
    if (!user) {
      return { settings: '/dashboard/settings', profile: '/dashboard/settings' };
    }

    const isAdmin = this.authService.isAdmin(user.email);
    const baseRoute = isAdmin ? '/admin/dashboard' : '/user/dashboard';
    
    return {
      settings: `${baseRoute}/settings`,
      profile: `${baseRoute}/settings`
    };
  });

  // Computed property for displaying email in dropdown
  displayEmail = computed(() => {
    const email = this.userProfile().email;
    if (!email) return 'User';
    
    // If email is too long, truncate it intelligently
    if (email.length > 25) {
      const [localPart, domain] = email.split('@');
      if (localPart.length > 15) {
        return `${localPart.substring(0, 12)}...@${domain}`;
      }
    }
    
    return email;
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
    this.showUserMenu.set(false); // Close the menu first
    this.authService.logout().catch(error => {
      console.error('Logout failed:', error);
    });
  }

  onImageError(event: Event) {
    // Handle image loading errors by hiding the image and showing initials instead
    const img = event.target as HTMLImageElement;
    console.warn('Profile image failed to load, falling back to initials');
    
    // Set the error flag to force fallback to initials
    this.imageLoadError.set(true);
  }

  onImageLoad(event: Event) {
    // Image loaded successfully - no action needed
    // The error flag will be reset when user changes
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close dropdowns when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showNotifications.set(false);
      this.showUserMenu.set(false);
    }
  }
}
