import { Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly USERS_KEY = 'railconnect_users';
  private static readonly CURRENT_USER_KEY = 'railconnect_current_user';

  private currentUserSignal = signal<User | null>(this.loadCurrentUser());

  constructor() {
    this.seedDefaultUsers();
  }

  private seedDefaultUsers(): void {
    const existing = this.getStoredUsers();
    if (existing.length === 0) {
      const demoUsers: User[] = [
        {
          id: 'usr_1',
          name: 'Demo Traveler',
          email: 'user@railconnect.com',
          mobile: '9876543210',
          password: 'user123'
        },
        {
          id: 'usr_2',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          mobile: '9123456780',
          password: 'password123'
        }
      ];
      this.saveStoredUsers(demoUsers);
    }
  }

  private getStoredUsers(): User[] {
    try {
      const data = localStorage.getItem(AuthService.USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveStoredUsers(users: User[]): void {
    try {
      localStorage.setItem(AuthService.USERS_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }

  private loadCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(AuthService.CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }

  register(userData: { name: string; email: string; mobile: string; password: string }): { success: boolean; messageKey: string } {
    const users = this.getStoredUsers();
    const normalizedEmail = userData.email.trim().toLowerCase();

    // Check duplicate email
    const exists = users.some(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (exists) {
      return { success: false, messageKey: 'ERR_EMAIL_EXISTS' };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: userData.name.trim(),
      email: normalizedEmail,
      mobile: userData.mobile.trim(),
      password: userData.password
    };

    users.push(newUser);
    this.saveStoredUsers(users);

    return { success: true, messageKey: 'SUCCESS_REGISTER' };
  }

  login(email: string, password: string): { success: boolean; messageKey: string; user?: User } {
    const users = this.getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (!user) {
      return { success: false, messageKey: 'ERR_USER_NOT_FOUND' };
    }

    if (user.password !== password) {
      return { success: false, messageKey: 'ERR_INVALID_CREDENTIALS' };
    }

    // Save session without storing raw password in current user state
    const sessionUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile
    };

    try {
      localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(sessionUser));
    } catch {
      // ignore
    }
    this.currentUserSignal.set(sessionUser);

    return { success: true, messageKey: 'LOGIN_SUCCESS', user: sessionUser };
  }

  logout(): void {
    try {
      localStorage.removeItem(AuthService.CURRENT_USER_KEY);
    } catch {
      // ignore
    }
    this.currentUserSignal.set(null);
  }
}
