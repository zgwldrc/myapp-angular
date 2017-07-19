import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

import { Account } from '../models/account';
import { AccountType } from "../models/account-type";


@Injectable()
export class AccountService {
  private accountApi = 'http://localhost:8000/api/account/';

  constructor(private http: Http) { }

  getList(
    queryString: string
  ): Observable<Account[]>{
    const url = this.accountApi + `?` + queryString;
    return this.http.get(url)
      .map(resp => resp.json() as Account[])
  }

  getTypeList(): Observable<AccountType[]> {
    const url = this.accountApi + 'typelist/';
    return this.http.get(url)
      .map(resp => resp.json() as AccountType[]);
  }

  getCount(): Observable<number> {
    const url = this.accountApi + 'count/';
    return this.http.get(url)
      .map(resp => resp.json().count as number);
  }

}
