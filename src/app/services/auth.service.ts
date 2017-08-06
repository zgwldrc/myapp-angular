/**
 * Created by xiayu on 2017/7/30.
 */
import {Injectable, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  isAuthed: boolean;
  user: User;

  constructor(private http: Http){
    if (localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  }

  auth(user: User): Observable<User>{
    return this.http.post(environment.loginApi, JSON.stringify([user]),{withCredentials: true})
      .map(r => r.json()[0])
      .do( user => {
        this.user = user;
        this.isAuthed = true;
        localStorage.setItem('user', JSON.stringify(user));
      });
  }

  logout(): Observable<Response> {
    return this.http.post(environment.logoutApi,'', {withCredentials: true})
      .do(() => {
        this.isAuthed = false;
        this.user = null;
        localStorage.removeItem('user');
      });
  }

}
