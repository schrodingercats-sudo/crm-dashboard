import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
