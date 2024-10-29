import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginGuard } from '../auth/_guards/login.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', canActivate: [LoginGuard], component: DashboardComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
