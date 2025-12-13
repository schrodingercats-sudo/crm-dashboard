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

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'contacts', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'contacts/:id', component: ContactDetailComponent },
      { path: 'deals', component: DealsComponent },
      { path: 'integration', component: IntegrationComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'settings', component: SettingsComponent },
    ],
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
    path: '**',
    redirectTo: '',
  },
];