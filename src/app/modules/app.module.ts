import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import { HttpModule } from "@angular/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from '../components/root/app.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { AccountListComponent } from '../components/account-list/account-list.component';
import { AppRoutingModule } from "./app-routing.module";
import { AccountService } from "../services/account.service";
import { AccountQuickEditorComponent } from '../components/account-quick-editor/account-quick-editor.component';
import { MessageboxComponent } from '../components/messagebox/messagebox.component';
import { AccountAddComponent } from '../components/account-add/account-add.component';
import { AccountEditFormComponent } from '../components/account-edit-form/account-edit-form.component';
import {AccountAddEventEmitService} from "../services/account-add-event-emit.service";
import {AuthService} from "../services/auth.service";
import {CookieModule} from "ngx-cookie";
import {CustomErrorHandler} from "../custom-error-handler";
import { AuthGuard } from '../guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AccountListComponent,
    AccountQuickEditorComponent,
    MessageboxComponent,
    AccountAddComponent,
    AccountEditFormComponent,
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
    AccountService,
    AccountAddEventEmitService,
    AuthGuard,
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  entryComponents: [
    MessageboxComponent,
    AccountAddComponent,
    AccountEditFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
