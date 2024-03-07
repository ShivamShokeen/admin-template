import { Routes } from '@angular/router';
import { SignInComponent } from './signup-signin/sign-in/sign-in.component';
import { SignUpComponent } from './signup-signin/sign-up/sign-up.component';
import { DashboardComponent } from './signup-signin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
