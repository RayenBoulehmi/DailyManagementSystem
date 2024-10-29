import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService: AuthService) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["dashboard"]);
      this.authService.logout();
      return false;
    }

    if (this.sessionExpired()) {
      alert("Session expired, please log in again.");
      this.authService.logout();
      return false;
    }

    return true;
  }

  private sessionExpired(): boolean {
    return !!localStorage.getItem("accessToken") && !this.authService.isAuthenticated();
  }
}
