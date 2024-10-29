import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UserService } from '../_services/user.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';


@NgModule({
    imports: [
        CommonModule,
        // LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,        
        HttpClientModule,
        AppLayoutModule
       
    ],
    declarations: [LoginComponent],
    providers:[]
})
export class LoginModule { }
