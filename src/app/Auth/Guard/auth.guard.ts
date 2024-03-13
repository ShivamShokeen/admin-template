import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { inject } from '@angular/core';

// export const canActivate: (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) =>
//   | Observable<boolean | UrlTree>
//   | Promise<boolean | UrlTree>
//   | boolean
//   | UrlTree = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const router = inject(Router);
//   const token = localStorage.getItem('user_details');
//   if (token) {
//     // If the user is logged in, redirect to the dashboard
//     router.navigate(['/dashboard']);
//     return false;
//   } else {
//     // router.navigate(['/sign-in']);
//     return false;
//   }
//   return true;
// };

export const canActivate = () => {
  const token = localStorage.getItem('user_details');
  const router = inject(Router);

  if (token) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/sign-in');
};
