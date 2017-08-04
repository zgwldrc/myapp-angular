import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule} from "@angular/forms";

import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from '../components/root/app.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { AccountListComponent } from '../components/account-list/account-list.component';
import { AppRoutingModule } from "./app-routing.module";
import { AccountService } from "../services/account.service";
import { MessageboxComponent } from '../components/messagebox/messagebox.component';
import {AccountAddEventEmitService} from "../services/account-add-event-emit.service";
import {AuthService} from "../services/auth.service";
import {CookieModule} from "ngx-cookie";
import {CustomErrorHandler} from "../custom-error-handler";
import { AuthGuard } from '../guards/auth.guard';
import {AccountFormComponent} from "../components/account-form/account-form.component";
import {RegisterFormComponent} from "../components/register-form/register-form.component";
import {LoginRegistryTabsetComponent} from "../components/login-registry-tabset/login-registry-tabset.component";
import {UserService} from "../services/user.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AccountListComponent,
    MessageboxComponent,
    AccountFormComponent,
    RegisterFormComponent,
    LoginRegistryTabsetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService,
    AccountService,
    AccountAddEventEmitService,
    AuthGuard,
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  entryComponents: [
    MessageboxComponent,
    AccountFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
