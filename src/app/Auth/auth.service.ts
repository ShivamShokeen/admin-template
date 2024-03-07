import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(token: string): void {
    localStorage.setItem('user_details', token);
  }

  logout(): void {
    localStorage.removeItem('user_details');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user_details') !== null;
  }
  
}
