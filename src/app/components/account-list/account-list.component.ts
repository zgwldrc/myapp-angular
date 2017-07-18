import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account";
import { AccountType } from "../../models/account-type";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-account-list',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css']
})
export class AccountListComponent implements OnInit {

  account_list: Observable<Account[]>;
  filter: any;
  accountTypeList: AccountType[];
  private searchTerms: Subject<string>;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.filter = {
      page_size: 10,
      page: 1,
      type: null,
      search_term: null,
      login_to: null,
      order_by: null
    };
    this.searchTerms = new BehaviorSubject<string>(this.obj2QueryString(this.filter));
    // this.account_list = this.accountService.getList(this.obj2QueryString(this.filter));
    this.account_list = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(queryString =>
          this.accountService.getList(queryString)
      )
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Account[]>([]);
      });
    // this.searchTerms.next(this.obj2QueryString(this.filter));
    this.accountService.getTypeList()
      .subscribe((accountTypeList: AccountType[]) => this.accountTypeList = accountTypeList)
  }

  private obj2QueryString(obj){
    let queryString = new Array();
    for (let key in obj) {
      if (obj[key] !== null)
        queryString.push(`${key}=${obj[key]}`)
    }
    return queryString.join('&')
  }

  search(){
    this.searchTerms.next(this.obj2QueryString(this.filter));
  }

}
