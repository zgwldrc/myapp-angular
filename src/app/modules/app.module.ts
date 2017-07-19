import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

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



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AccountListComponent,
    AccountQuickEditorComponent,
    MessageboxComponent,
    AccountAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule.forRoot()
  ],
  providers: [ AccountService ],
  entryComponents: [
    MessageboxComponent,
    AccountAddComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
