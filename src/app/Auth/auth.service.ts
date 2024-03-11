import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(token: string): void {
    localStorage.setItem('user_details', token);
  }

  logout(): void {
    localStorage.removeItem('user_details');
  }

  isLoggedIn(): boolean {
    let data = false;
    if (isPlatformBrowser(this.platformId)) {
      data = localStorage.getItem('user_details') !== null ? true : false;
    }
    return data;
  }
}
