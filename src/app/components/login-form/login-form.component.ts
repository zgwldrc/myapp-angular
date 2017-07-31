import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CookieService} from "ngx-cookie";



@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  user: any = {};
  errMsg: string;
  loginForm: FormGroup;
  usernameMinLength: number = 4;
  usernameMaxLength: number = 30;
  passwordMinLength: number = 6;
  passwordMaxLength: number = 30;


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['',[
        Validators.required,
        Validators.minLength(this.usernameMinLength),
        Validators.maxLength(this.usernameMaxLength)
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ]],
    })
  }

  auth(){
    this.user = this.loginForm.value;
    this.authService.auth(this.user)
      .subscribe(
        () => {
          this.router.navigate(['/account']);
        },
        (error: Response ) => {
          if (error.status == 403) {
            this.errMsg = '登陆失败，帐户或密码不正确';
          }
        }
      );
  }

}
