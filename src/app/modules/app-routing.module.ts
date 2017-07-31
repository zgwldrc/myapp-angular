import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from "../components/account-list/account-list.component";
import {LoginFormComponent} from "../components/login-form/login-form.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'account', component: AccountListComponent},
      {path: 'login', component: LoginFormComponent}
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
