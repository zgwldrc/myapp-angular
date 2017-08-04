/**
 * Created by xiayu on 2017/8/4 0004.
 */

import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Http, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'



@Injectable()
export class UserService {
  userApi = environment.userApi;

  constructor(private http: Http,){

  }

  register(user: User): Observable<Response>{
    return this.http.post(this.userApi, JSON.stringify([user]),{withCredentials: true})
  }

  checkUserExistence(username: string): Observable<User>{
    return this.http.get(this.userApi + `?username=${username}`)
      .map((r: Response) => {
        return r.json()[0];
      });
  }
}
