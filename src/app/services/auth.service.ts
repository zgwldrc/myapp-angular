/**
 * Created by xiayu on 2017/7/30.
 */
import {Injectable, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService implements OnInit {
  isAuthed: boolean;

  constructor(
    private http: Http
  ){
    if (localStorage.getItem('authed')) {
      this.isAuthed = true;
    } else {
      this.isAuthed = false;
    }
  }

  ngOnInit(){

  }

  auth(user: any): Observable<Response>{
    return this.http.post(environment.loginApi, JSON.stringify(user),{withCredentials: true})
  }

  logout(): Observable<Response> {
    return this.http.post(environment.logoutApi,'', {withCredentials: true})
  }

}
