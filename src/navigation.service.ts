import { Injectable, inject, computed } from '@angular/core';
import { AuthService } from './auth.service';
import { DataAccessService } from './data-access.service';

export interface NavItemChild {
  id: string;
  label: string;
  route: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: NavItemChild[];
  path?: string;
  roles: ('admin' | 'user')[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private authService = inject(AuthService);
  private dataAccessService = inject(DataAccessService);

  // Computed property to determine current user role
  currentRole = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return null;
    return this.authService.isAdmin(user.email) ? 'admin' : 'user';
  });

  // Get role-appropriate navigation items
  getNavItems = computed(() => {
    const role = this.currentRole();
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    
    if (!role) return [];

    const baseRoute = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    const allNavItems = this.getAllNavItems(baseRoute, role);
    
    // Filter navigation items based on user permissions
    return this.dataAccessService.filterNavigationItems(allNavItems, currentUserEmail);
  });

  // Get role-appropriate bottom navigation items
  getBottomNavItems = computed(() => {
    const role = this.currentRole();
    const currentUserEmail = this.dataAccessService.getCurrentUserEmail();
    
    if (!role) return [];

    const baseRoute = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    const bottomNavItems = [
      { 
        id: 'settings', 
        label: 'Settings', 
        icon: this.getIcon('settings'), 
        route: `${baseRoute}/settings`,
        roles: [role] as ('admin' | 'user')[]
      },
      { 
        id: 'help', 
        label: 'Help & Support', 
        icon: this.getIcon('help'), 
        route: `${baseRoute}/help`,
        roles: [role] as ('admin' | 'user')[]
      },
    ];

    return this.dataAccessService.filterNavigationItems(bottomNavItems, currentUserEmail);
  });

  private getAllNavItems(baseRoute: string, role: 'admin' | 'user'): NavItem[] {
    if (role === 'admin') {
      return [
        { 
          id: 'overview', 
          label: 'Overview', 
          icon: this.getIcon('overview'), 
          route: `${baseRoute}/overview`,
          roles: ['admin'] as ('admin' | 'user')[]
        },
        {
          id: 'contacts',
          label: 'Contacts',
          icon: this.getIcon('contacts'),
          path: `${baseRoute}/contacts`,
          roles: ['admin'] as ('admin' | 'user')[],
          children: [
            { id: 'leads', label: 'Leads', route: `${baseRoute}/contacts/leads` },
            { id: 'referral_partners', label: 'Referral Partners', route: `${baseRoute}/contacts/referral-partners` }
          ]
        },
        {
          id: 'deals',
          label: 'Deals',
          icon: this.getIcon('deals'),
          path: `${baseRoute}/deals`,
          roles: ['admin'] as ('admin' | 'user')[],
          children: [
            { id: 'all_deals', label: 'All Deals', route: `${baseRoute}/deals` }
          ]
        },
        { 
          id: 'integration', 
          label: 'Integration', 
          icon: this.getIcon('integration'), 
          route: `${baseRoute}/integration`,
          roles: ['admin'] as ('admin' | 'user')[]
        },
        { 
          id: 'tasks', 
          label: 'Tasks', 
          icon: this.getIcon('tasks'), 
          route: `${baseRoute}/tasks`,
          roles: ['admin'] as ('admin' | 'user')[]
        },
      ];
    } else {
      return [
        { 
          id: 'overview', 
          label: 'Overview', 
          icon: this.getIcon('overview'), 
          route: `${baseRoute}/overview`,
          roles: ['user'] as ('admin' | 'user')[]
        },
        { 
          id: 'contacts', 
          label: 'My Contacts', 
          icon: this.getIcon('contacts'), 
          route: `${baseRoute}/contacts`,
          roles: ['user'] as ('admin' | 'user')[]
        },
        { 
          id: 'deals', 
          label: 'My Deals', 
          icon: this.getIcon('deals'), 
          route: `${baseRoute}/deals`,
          roles: ['user'] as ('admin' | 'user')[]
        },
        { 
          id: 'tasks', 
          label: 'My Tasks', 
          icon: this.getIcon('tasks'), 
          route: `${baseRoute}/tasks`,
          roles: ['user'] as ('admin' | 'user')[]
        },
      ];
    }
  }

  private getIcon(name: string): string {
    const icons: { [key: string]: string } = {
      overview: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
      contacts: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`,
      deals: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
      integration: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
      tasks: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`,
      settings: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
      help: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 1.846-1.226 3.37-3 3.867v.133M12 18h.01" /></svg>`
    };
    return icons[name] || '';
  }
}