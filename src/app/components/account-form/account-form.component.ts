/**
 * Created by xiayu on 2017/8/4 0004.
 */
import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../services/account.service";
import {AccountAddEventEmitService} from "../../services/account-add-event-emit.service";
import {AccountType} from "../../models/account-type";
import {Account} from "../../models/account";


@Component({
  selector: 'account-form',
  templateUrl: 'account-form.component.html'
})
export class AccountFormComponent implements OnInit {
  formTitle: string;
  formType: string;

  account: Account = new Account();
  accountTypeList: AccountType[];

  accountForm: FormGroup;

  usernameMaxLength = 20;
  passwordMaxLength = 100;
  loginUrlMaxLength = 100;
  descMaxLength = 280;

  /* store password input control's type attribute value*/
  passwordInputType: string = 'password';
  /* store textContent about the button which is a toggler responded for changing
  * the passwordInputType value*/
  inversePasswordInputType: string = 'show plain password';


  constructor(
    public activeModal: NgbActiveModal,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    public accountAddEventEmitService: AccountAddEventEmitService
  ) { }

  ngOnInit(){
    this.accountForm = this.formBuilder.group({
      username: [this.account?this.account.fields.username:null, [
        Validators.required,
        Validators.maxLength(this.usernameMaxLength)
      ]],
      password: [this.account?this.account.fields.password:null, [
        Validators.required,
        Validators.maxLength(this.passwordMaxLength)
      ]],
      login_url: [this.account?this.account.fields.login_url:null, [
        Validators.required,
        Validators.maxLength(this.loginUrlMaxLength)
      ]],
      type: [this.account?this.account.fields.type:null, [
        Validators.required
      ]],
      desc: [this.account?this.account.fields.desc:null, [
        Validators.required,
        Validators.maxLength(this.descMaxLength)
      ]],
    });

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

  updateAccount() {
    this.account.fields = this.accountForm.value;
    this.accountService.updateAccount(this.account)
      .subscribe(any => {
        console.log('update OK!');
        this.activeModal.close('close');
      })
  }

  passwordInputTypeToggle(){
    if (this.passwordInputType == 'password'){
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
