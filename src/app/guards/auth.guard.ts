/**
 * Created by xiayu on 2017/7/30.
 */
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( ! this.authService.isAuthed ) {
      this.router.navigateByUrl('/login');
    }
    return this.authService.isAuthed;
  }
}
