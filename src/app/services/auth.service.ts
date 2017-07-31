/**
 * Created by xiayu on 2017/7/30.
 */
import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {CookieService} from "ngx-cookie";

@Injectable()
export class AuthService {
  isAuthed: boolean = false;

  constructor(
    private http: Http,
    private cookieService: CookieService,
  ){

  }

  auth(user: any): Observable<any>{
    return this.http.post(environment.loginApi, JSON.stringify(user))
      .map((r: Response)=> {
        console.log(this.cookieService.getAll());
        console.log('login OK!');return r;
      })
  }

}
