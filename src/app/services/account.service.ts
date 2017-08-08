import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Observable} from "rxjs";

import { Account } from '../models/account';
import { AccountType } from "../models/account-type";
import {environment} from "../../environments/environment";


@Injectable()
export class AccountService {
  private accountApi = environment.accountApi;

  constructor(
    private http: Http,
  ) { }

  getList(
    queryString: string
  ): Observable<Account[]>{
    const url = this.accountApi + `?` + queryString;

    return this.http.get(url,{withCredentials: true})
      .map(resp => resp.json() as Account[]);
  }

  getTypeList(): Observable<AccountType[]> {
    if (sessionStorage.getItem('account_types')){
      return Observable.of(JSON.parse(sessionStorage.getItem('account_types')))
    }
    const url = this.accountApi + 'typelist/';
    return this.http.get(url,{withCredentials: true})
      .map(resp => resp.json() as AccountType[])
      .do(data => sessionStorage.setItem('account_types', JSON.stringify(data)));
  }

  getCount(queryString: string): Observable<number> {
    const url = this.accountApi + 'count/' + `?` + queryString;
    return this.http.get(url,{withCredentials: true})
      .map(resp => resp.json().count as number);
  }

  addAccount(account: Account): Observable<any> {
    const url = this.accountApi;
    return this.http.post(url, JSON.stringify([account]),{withCredentials: true})
      .map(resp => resp.json())
  }

  deleteAccount(accountId: number): Observable<any> {
    const url = this.accountApi + accountId;
    return this.http.delete(url,{withCredentials: true})
      .map(resp => resp)
  }

  updateAccount(account: Account): Observable<any> {
    const url = this.accountApi + account.pk;
    return this.http.put(url,JSON.stringify([account]), {withCredentials: true})
      .map(resp => resp)
  }
}
