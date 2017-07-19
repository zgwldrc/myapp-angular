import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { ClipboardService } from 'ng2-clipboard/ng2-clipboard';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AccountService } from "../../services/account.service";

import { Account } from "../../models/account";
import { AccountType } from "../../models/account-type";
import {BehaviorSubject} from "rxjs";
import {MessageboxComponent} from "../messagebox/messagebox.component";
import {AccountAddComponent} from "../account-add/account-add.component";



@Component({
  selector: 'app-account-list',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css'],
  providers: [ClipboardService]
})
export class AccountListComponent implements OnInit {

  account_list: Observable<Account[]>;
  filter: any;
  count: number;
  accountTypeList: AccountType[];
  private searchTerms: Subject<string>;
  constructor(
    private accountService: AccountService,
    private clipboard: ClipboardService,
    private modalService: NgbModal
  ) { }

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

    this.account_list = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .do(i => this.getCount())
      .switchMap(queryString =>
          this.accountService.getList(queryString)
      )
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Account[]>([]);
      });

    this.accountService.getTypeList()
      .subscribe((accountTypeList: AccountType[]) => this.accountTypeList = accountTypeList)
  }

  private obj2QueryString(obj){
    let queryString: string[] = [];
    for (let key in obj) {
      if (obj[key] !== null)
        queryString.push(`${key}=${obj[key]}`)
    }
    return queryString.join('&')
  }

  search(){
    this.searchTerms.next(this.obj2QueryString(this.filter));
  }

  reset(){
    this.filter = {
      page_size: 10,
      page: 1,
      type: null,
      search_term: null,
      login_to: null,
      order_by: null
    };
    this.search();
  }

  getCount() {
    this.accountService.getCount()
      .subscribe(count => this.count = count)
  }

  copyToClipBoard(str: string){
    this.clipboard.copy(str);
    let modalRef = this.modalService.open(MessageboxComponent);
    modalRef.componentInstance.msg = '密码已经拷贝到剪切板，Ctrl + V 即可粘贴使用';
  }

  addAccount(){
    this.modalService.open(AccountAddComponent);
  }

}
