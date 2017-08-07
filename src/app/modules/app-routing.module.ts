import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from "../components/account-list/account-list.component";
import { AuthGuard } from "../guards/auth.guard";
import { LoginRegistryTabsetComponent } from "../components/login-registry-tabset/login-registry-tabset.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: '/account', pathMatch: 'full'},
      {path: 'account', component: AccountListComponent, canActivate: [ AuthGuard ]},
      {path: 'login', component: LoginRegistryTabsetComponent}
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
