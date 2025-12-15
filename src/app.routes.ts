import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { OnboardingComponent } from './onboarding.component';
import { DashboardComponent } from './dashboard.component';
import { LandingComponent } from './landing.component';
import { OverviewComponent } from './overview.component';
import { ContactsComponent } from './contacts.component';
import { DealsComponent } from './deals.component';
import { IntegrationComponent } from './integration.component';
import { TasksComponent } from './tasks.component';
import { SettingsComponent } from './settings.component';
import { ContactDetailComponent } from './contact-detail.component';
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
import { ReferralPartnersComponent } from './referral-partners.component';
import { authGuard } from './auth.guard';

// New Components
import { ClientsComponent } from './dashboard/clients/clients.component';
import { ClientManagerComponent } from './dashboard/clients/client-manager.component';
import { PortalLoginComponent } from './portal/portal-login.component';
import { PortalDashboardComponent } from './portal/portal-dashboard.component';

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
  {
    path: 'dashboard',
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'referral-partners', component: ReferralPartnersComponent },
      { path: 'contacts/:id', component: ContactDetailComponent },
      { path: 'deals', component: DealsComponent },
      { path: 'integration', component: IntegrationComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'settings', component: SettingsComponent },
      // New Admin Routes
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/:id', component: ClientManagerComponent },
    ],
    canActivate: [authGuard]
  },
  // Customer Portal Routes
  {
    path: 'portal',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: PortalLoginComponent },
      { path: 'dashboard', component: PortalDashboardComponent }
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
  {
    path: '**',
    redirectTo: '',
  },
];