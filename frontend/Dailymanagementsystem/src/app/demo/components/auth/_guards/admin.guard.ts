import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const roles = await this.getRolesFromLocalStorage();
      const isAdmin = roles.includes("ADMIN");

      if (!isAdmin) {
        this.router.navigate(["dashboard"]);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error while getting roles:", error);
      this.router.navigate(["home"]);
      return false;
    }
  }

  private getRolesFromLocalStorage(): Promise<string> {
    return new Promise((resolve, reject) => {
      const roles = localStorage.getItem("roles") || "";
      if (roles) {
        resolve(roles);
      } else {
        reject("Roles not found in localStorage");
      }
    });
  }
}
