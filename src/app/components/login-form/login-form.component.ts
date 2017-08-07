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
  user: User = new User();
  errMsg: string;
  loginForm: FormGroup;
  usernameMaxLength: number = 30;
  passwordMaxLength: number = 30;


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['',[
        Validators.required,
        Validators.email,
        Validators.maxLength(this.usernameMaxLength)
      ]],
      password: ['',[
        Validators.required,
        Validators.maxLength(this.passwordMaxLength)
      ]],
    })
  }

  auth(){
    this.user.fields = this.loginForm.value;
    this.authService.auth(this.user)
      .subscribe(
        (r) => {
          console.log(r);
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
