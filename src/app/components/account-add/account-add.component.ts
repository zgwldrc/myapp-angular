import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {Account} from "../../models/account";
import {AccountService} from "../../services/account.service";
import {AccountType} from "../../models/account-type";
import {AccountAddEventEmitService} from "../../services/account-add-event-emit.service";


@Component({
  selector: 'app-account-add',
  templateUrl: 'account-add.component.html',
  styleUrls: ['account-add.component.css'],
})
export class AccountAddComponent implements OnInit {

  account: Account = new Account();
  accountForm: FormGroup;
  passwordInputType: string = 'password';
  inversePasswordInputType: string = 'show plain password';
  usernameMaxLength = 20;
  passwordMaxLength = 100;
  loginUrlMaxLength = 100;
  descMaxLength = 280;
  accountTypeList: AccountType[];
  constructor(
    public activeModal: NgbActiveModal,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    public accountAddEventEmitService: AccountAddEventEmitService
  ) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(this.usernameMaxLength)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(this.passwordMaxLength)
      ]],
      login_url: ['', [
        Validators.required,
        Validators.maxLength(this.loginUrlMaxLength)
      ]],
      type: ['3', [Validators.required]],
      desc: ['', [
        Validators.required,
        Validators.maxLength(this.descMaxLength)
      ]],
    });

    this.account.fields.type = 3;
    this.accountService.getTypeList()
      .subscribe((accountTypeList: AccountType[]) => this.accountTypeList = accountTypeList);
  }

  addAccount(event) {
    this.account.fields = this.accountForm.value;
    this.accountService.addAccount(this.account)
      .subscribe(data => {
        this.accountForm.reset();
        this.account.pk = data.id;
        this.accountAddEventEmitService.subject.emit(this.account);
      });

    if (event.target.name == 'submitThenQuit') {
      this.activeModal.close('Close click');
    }
  }

  passwordInputTypeToggle(){
    if (this.passwordInputType == 'password') {
      this.passwordInputType = 'text';
      this.inversePasswordInputType = 'hidden password';
    } else {
      this.passwordInputType = 'password';
      this.inversePasswordInputType = 'show plain password';
    }
  }

  generatePassword(){
    let password = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    this.accountForm.get('password').setValue(password);
  }
}
