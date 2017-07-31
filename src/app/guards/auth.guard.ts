/**
 * Created by xiayu on 2017/7/30.
 */
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { AuthService } from '../services/auth.service'

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private authService: AuthService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.isAuthed;
  }
}
