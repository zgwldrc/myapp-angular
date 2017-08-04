/**
 * Created by xiayu on 2017/7/31 0031.
 */
import {ErrorHandler, Injectable} from '@angular/core';
import {Response} from "@angular/http";
import {AuthService} from "./services/auth.service";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private authService: AuthService){}
  public handleError(error: any): void {
    if (error instanceof Response) {
      if (error.status == 401) {
        window.location.href = '/#login';
        this.authService.isAuthed = false;
        localStorage.removeItem('authed')
      }
    }
    console.error(error);
  }
}
