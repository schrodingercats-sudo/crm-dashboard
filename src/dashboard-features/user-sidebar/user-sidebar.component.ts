import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../navigation.service';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSidebarComponent {
  private router = inject(Router);
  protected navigationService = inject(NavigationService);
  private authService = inject(AuthService);

  expandedState = signal<{ [key: string]: boolean }>({});

  // Use role-based navigation items from NavigationService
  navItems = this.navigationService.getNavItems;
  bottomNavItems = this.navigationService.getBottomNavItems;

  isParentActive = computed(() => (path?: string) => {
    if (!path) return false;
    return this.router.url.startsWith(path);
  });

  toggle(id: string) {
    this.expandedState.update(state => ({
      ...state,
      [id]: !state[id]
    }));
  }

  logout() {
    this.authService.logout().catch(error => {
      console.error('Logout failed:', error);
    });
  }
}