import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from "../components/account-list/account-list.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'account', component: AccountListComponent}
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
