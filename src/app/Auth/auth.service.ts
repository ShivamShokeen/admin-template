import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  login(token: string): void {
    localStorage.setItem('user_details', token);
  }

  logout(): void {
    localStorage.removeItem('user_details');
    this.router.navigate(['sign-in']);
  }

  isLoggedIn(): boolean {
    let data = false;
    if (isPlatformBrowser(this.platformId)) {
      data = localStorage.getItem('user_details') !== null ? true : false;
    }
    return data;
  }

  isAuthenticated(): any {
    let data = false;
    if (isPlatformBrowser(this.platformId)) {
      data = localStorage.getItem('user_details') !== null ? true : false;
    }
    return data;
  }

}
