import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from "../components/account-list/account-list.component";
import {LoginFormComponent} from "../components/login-form/login-form.component";
import { AuthGuard } from "../guards/auth.guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: '/account', pathMatch: 'full'},
      {path: 'account', component: AccountListComponent, canActivate: [ AuthGuard ]},
      {path: 'login', component: LoginFormComponent}
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
