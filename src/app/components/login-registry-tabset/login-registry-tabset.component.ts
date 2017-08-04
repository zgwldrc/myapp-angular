/**
 * Created by xiayu on 2017/8/4 0004.
 */

import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'login-registry-tabset',
  templateUrl: 'login-registry-tabset.component.html',
  styleUrls: ['login-registry-tabset.component.css']
})
export class LoginRegistryTabsetComponent {
  constructor(
    private authService: AuthService
  ){

  }
  ngOnInit() {
    this.authService.logout().subscribe(
      () => {
        this.authService.isAuthed = false;
        localStorage.removeItem('authed');
      }
    )
  }
}
