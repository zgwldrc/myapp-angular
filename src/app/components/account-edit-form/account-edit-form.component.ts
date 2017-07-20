import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from "../../models/account";
import {AccountService} from "../../services/account.service";
import {AccountType} from "../../models/account-type";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-account-edit-form',
  templateUrl: 'account-edit-form.component.html',
  styleUrls: ['account-edit-form.component.css']
})
export class AccountEditFormComponent implements OnInit {

  @Input() account: Account;
  accountForm: FormGroup;
  passwordInputType: string = 'password';
  inversePasswordInputType: string = 'show plain password';
  usernameMinLength = 5;
  usernameMaxLength = 20;
  passwordMinLength = 8;
  passwordMaxLength = 100;
  loginUrlMaxLength = 100;
  descMaxLength = 280;
  accountTypeList: AccountType[];
  constructor(
    private accountService: AccountService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      username: [this.account.fields.username, [
        Validators.required,
        Validators.minLength(this.usernameMinLength),
        Validators.maxLength(this.usernameMaxLength)
      ]],
      password: [this.account.fields.password, [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ]],
      login_url: [this.account.fields.login_url, [
        Validators.required,
        Validators.maxLength(this.loginUrlMaxLength)
      ]],
      type: [this.account.fields.type, [Validators.required]],
      desc: [this.account.fields.desc, [
        Validators.required,
        Validators.maxLength(this.descMaxLength)
      ]],
    });

    this.accountService.getTypeList()
      .subscribe((accountTypeList: AccountType[]) => this.accountTypeList = accountTypeList);
  }

  updateAccount() {
    this.account.fields = this.accountForm.value;
    this.accountService.updateAccount(this.account)
      .subscribe(any => {
        console.log('update OK!');
        this.activeModal.close('close');
      })
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
