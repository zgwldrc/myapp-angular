import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import { AppComponent } from '../components/root/app.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { AccountListComponent } from '../components/account-list/account-list.component';
import { AppRoutingModule } from "./app-routing.module";
import { AccountService } from "../services/account.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AccountListComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpModule, FormsModule
  ],
  providers: [ AccountService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
