import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './_guards/login.guard';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
//, canActivate: [LoginGuard]
        { path: "login", component: LoginComponent },

      
        //, canActivate: [LoginGuard]
        { path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
