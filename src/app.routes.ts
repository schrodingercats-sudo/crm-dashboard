import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { OnboardingComponent } from './onboarding.component';
import { LandingComponent } from './landing.component';
import { IdealComponent } from './ideal.component';
import { PricingComponent } from './pricing.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';
import { PrivacyComponent } from './privacy.component';
import { TermsComponent } from './terms.component';
import { AccountNotFoundComponent } from './account-not-found.component';
import { FaqPageComponent } from './faq-page.component';
import { AboutComponent } from './about.component';
import { ChangelogComponent } from './changelog.component';
import { BrandComponent } from './brand.component';
import { HelpComponent } from './help.component';
import { PortalLoginComponent } from './portal/portal-login.component';

// Dashboard Imports
import { DashboardLayoutComponent } from './dashboard-features/dashboard-layout.component';
import { AdminDashboardLayoutComponent } from './dashboard-features/admin-dashboard-layout.component';
import { UserDashboardLayoutComponent } from './dashboard-features/user-dashboard-layout.component';
import { OverviewComponent } from './dashboard-features/overview/overview.component';
import { LeadsComponent } from './dashboard-features/leads/leads.component';
import { ReferralPartnersComponent } from './dashboard-features/referral-partners/referral-partners.component';
import { DealsComponent } from './dashboard-features/deals/deals.component';
import { IntegrationComponent } from './dashboard-features/integration/integration.component';
import { TasksComponent } from './dashboard-features/tasks/tasks.component';
import { SettingsComponent } from './dashboard-features/settings/settings.component';
import { HelpComponent as DashboardHelpComponent } from './dashboard-features/help/help.component';

// Guards
import { adminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'ideal',
    component: IdealComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  // Customer Portal Routes
  {
    path: 'portal',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: PortalLoginComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
  },
  {
    path: 'account-not-found',
    component: AccountNotFoundComponent,
  },
  {
    path: 'faq',
    component: FaqPageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'changelog',
    component: ChangelogComponent,
  },
  {
    path: 'brand',
    component: BrandComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  // Admin Dashboard Routes
  {
    path: 'admin/dashboard',
    component: AdminDashboardLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      {
        path: 'contacts',
        children: [
          { path: '', redirectTo: 'leads', pathMatch: 'full' },
          { path: 'leads', component: LeadsComponent },
          { path: 'referral-partners', component: ReferralPartnersComponent }
        ]
      },
      { path: 'deals', component: DealsComponent },
      { path: 'integration', component: IntegrationComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: DashboardHelpComponent },
      // Fallback for invalid admin routes
      { path: '**', redirectTo: 'overview' }
    ]
  },
  // User Dashboard Routes
  {
    path: 'user/dashboard',
    component: UserDashboardLayoutComponent,
    canActivate: [userGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'contacts', component: LeadsComponent }, // Reusing LeadsComponent for user contacts
      { path: 'deals', component: DealsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: DashboardHelpComponent },
      // Fallback for invalid user routes
      { path: '**', redirectTo: 'overview' }
    ]
  },
  // Legacy Dashboard Routes (for backward compatibility)
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      {
        path: 'contacts',
        children: [
          { path: '', redirectTo: 'leads', pathMatch: 'full' },
          { path: 'leads', component: LeadsComponent },
          { path: 'referral-partners', component: ReferralPartnersComponent }
        ]
      },
      { path: 'deals', component: DealsComponent },
      { path: 'integration', component: IntegrationComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: DashboardHelpComponent },
      // Fallback for invalid legacy routes
      { path: '**', redirectTo: 'overview' }
    ]
  },
  // Error handling routes
  {
    path: 'error',
    children: [
      { path: 'access-denied', component: AccountNotFoundComponent },
      { path: 'network-error', component: AccountNotFoundComponent },
      { path: '**', redirectTo: '/error/access-denied' }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];