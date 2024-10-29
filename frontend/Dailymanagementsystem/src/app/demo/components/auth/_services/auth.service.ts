import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


import { LoginRequest } from '../_models/login-request.interface';
import { LoginResponse } from '../_models/login-response.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private userService: UserService
  ) {
    if (this.isAuthenticated()) {
      this.loggedIn$.next(true);
    }
  }

  private readonly STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    ID: 'id',
    USERNAME: 'username',    
    ROLES: 'roles',
    CART_HASH: 'cartHash'
  };

  isUserAdmin(): Observable<any> {
    return this.isAdmin$.asObservable();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }



  login(loginRequestPayload: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginRequestPayload).pipe(
      map(response => {
        if (response.statusCode === 200) {
          this.router.navigate(['/dashboard']);
          console.log(response)
          const { user } = response.data!;
          localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, user.accessToken.toString());
          localStorage.setItem(this.STORAGE_KEYS.ID, user.id.toString());
          localStorage.setItem(this.STORAGE_KEYS.ROLES, user.roles.toString());
          this.loggedIn$.next(true);
          if (user.roles.includes("ROLE_ADMIN")) {
            this.isAdmin$.next(true)
          }
          this.userService.getUserDetails(user.id).pipe(take(1)).subscribe({
            error: (error) => {
              console.error(error)
            }
          })
        }
        return response;
      })
    );
  }

  logout(): void {
    this.clearUserDataFromStorage()
    this.loggedIn$.next(false);
    this.isAdmin$.next(false)
    this.router.navigateByUrl('/auth/login');
  }

  private clearUserDataFromStorage(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
}
