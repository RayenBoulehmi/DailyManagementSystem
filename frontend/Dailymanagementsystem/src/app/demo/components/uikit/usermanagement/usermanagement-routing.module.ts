import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from './usermanagement.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UserManagementComponent }
    ])],
    exports: [RouterModule],

})
export class UserManagementRoutingModule { }
