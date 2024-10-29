import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { LoginRequest } from '../_models/login-request.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword: boolean = false;
  loginForm: FormGroup;
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService,
              public layoutService: LayoutService,
              private messageService: MessageService,
              private router: Router,
              private titleService: Title,
              private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ["", Validators.compose([Validators.required, Validators.minLength(1), this.noWhitespaceValidator])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(1), this.noWhitespaceValidator])]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Log in - Daily Management System");
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  noWhitespaceValidator(control: AbstractControl): { 'whitespace': boolean } | null {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  login(): void {
    if (!this.isLoading && this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.isLoading = true;
      this.subscription = this.authService.login(loginRequest).pipe(take(1)).subscribe({
        next: (response) => {
          const severity = response.statusCode === 200 ? 'success' : 'error';
          const detail = response.statusCode === 200 ? 'Connected successfully' :
                         response.exception === 'Bad credentials' ? 'Please verify your username/password' : response.exception;
          const summary = response.statusCode === 200 ? 'Success' : 'Error';

          this.messageService.add({ severity, detail, summary });
          this.isLoading = false;

          if (response.statusCode === 200 && this.authService.isUserLoggedIn() && this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            detail: 'An error occurred. Please try again later.',
            summary: 'Error'
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
