
import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService, NavItem, NavItemChild } from '../../navigation.service';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarComponent {
  isOpen = input.required<boolean>();
  close = output<void>();

  private router = inject(Router);
  private navigationService = inject(NavigationService);
  private authService = inject(AuthService);

  expandedState = signal<{ [key: string]: boolean }>({
    'contacts': true,
    'deals': false
  });

  // Use navigation service for role-based navigation
  navItems = this.navigationService.getNavItems;
  bottomNavItems = this.navigationService.getBottomNavItems;

  isParentActive = computed(() => (path?: string) => {
    if (!path) return false;
    return this.router.url.startsWith(path);
  });

  onLinkClick() {
    this.close.emit();
  }

  toggle(id: string) {
    this.expandedState.update(state => ({
      ...state,
      [id]: !state[id]
    }));
  }

  logout() {
    this.close.emit(); // Close the sidebar first
    this.authService.logout().catch(error => {
      console.error('Logout failed:', error);
    });
  }
}
