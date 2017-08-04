/**
 * Created by xiayu on 2017/8/4 0004.
 */

import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'login-registry-tabset',
  templateUrl: 'login-registry-tabset.component.html',
  styleUrls: ['login-registry-tabset.component.css']
})
export class LoginRegistryTabsetComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
  ){

  }
  ngOnInit() {
    if (this.authService.isAuthed){
      this.router.navigateByUrl('/account');
    }
  }
}
