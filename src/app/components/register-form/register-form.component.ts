import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Subject, Observable} from "rxjs";
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  userExistence: boolean;
  debug: boolean = false;
  user: User = new User();
  errMsg: string;
  registerForm: FormGroup = new FormGroup({});
  usernameMaxLength: number = 30;
  passwordMaxLength: number = 30;
  private usernameSubject: Subject<string>;
  private validationErrorSubject: Subject<ValidationErrors>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  passwordAgainValidatorFactory(){
    return (c: AbstractControl): ValidationErrors => {
      if (c.value == this.registerForm.get('password').value && c.value !== ''){
        return null;
      }
      return {'passwordAgainError': '两次密码输入必须匹配'};
    }
  }

  usernameExistenceValidatorFactory(){
    return (c: AbstractControl): ValidationErrors => {
      if (!this.userExistence){
        return null;
      }
      return {'userExistence': '用户已经存在了哦^_^..'};
    }
  }

  ngOnInit() {
    this.usernameSubject = new Subject<string>();
    this.validationErrorSubject = new Subject<ValidationErrors>();

    this.registerForm = this.formBuilder.group({
      username: ['',[
        this.usernameExistenceValidatorFactory(),
        Validators.required,
        Validators.email,
        Validators.maxLength(this.usernameMaxLength)
      ]],
      password: ['',[
        Validators.required,
        Validators.maxLength(this.passwordMaxLength)
      ]],
      passwordAgain: ['', []]
    });


    this.registerForm.get('passwordAgain').validator = this.passwordAgainValidatorFactory();

    this.usernameSubject
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(username => {
        this.userService.checkUserExistence(username)
          .subscribe(
            (suc) => {
              this.userExistence = true;
              this.registerForm.get('username').updateValueAndValidity();
            },
            (err) => {
              this.userExistence = false;
              this.registerForm.get('username').updateValueAndValidity();
            }
          );
      });
  }


  register(){
    this.user.fields.username = this.registerForm.value.username;
    this.user.fields.password = this.registerForm.value.password;
    this.user.fields.email = this.user.fields.username;

    this.userService.register(this.user)
      .subscribe(
        () => {
          this.authService.auth(this.user).subscribe(
            () => {
              console.log('auth Ok! after register');
              this.router.navigateByUrl('/account');
            }
          )
        }
      );
  }

  nextUserName(){
    this.usernameSubject.next(this.registerForm.get('username').value);
  }
}
