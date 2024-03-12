import { Routes } from '@angular/router';
import { SignInComponent } from './signup-signin/sign-in/sign-in.component';
import { SignUpComponent } from './signup-signin/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { sign } from 'crypto';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthService } from './Auth/auth.service';
import { canActivate } from './Auth/Guard/auth.guard';

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
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
];
