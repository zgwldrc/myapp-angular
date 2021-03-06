import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Subject }           from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs";
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
import {MessageboxComponent} from "../messagebox/messagebox.component";
import {AccountAddEventEmitService} from "../../services/account-add-event-emit.service";
import {AccountFormComponent} from "../account-form/account-form.component";



@Component({
  selector: 'app-account-list',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css'],
  providers: [ClipboardService]
})
export class AccountListComponent implements OnInit {

  account_list: Account[];
  filter: any;
  count: number;
  accountTypeList: AccountType[];
  private searchTerms: Subject<string>;
  constructor(
    private accountService: AccountService,
    private clipboard: ClipboardService,
    private modalService: NgbModal,
    public accountAddEventEmitService: AccountAddEventEmitService,
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
    this.searchTerms = new BehaviorSubject<string>(this.obj2QueryString());

    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .do(queryString => this.getCount(queryString))
      .switchMap(
        queryString => {
          return this.accountService.getList(queryString);
        }
      ).subscribe(
        list => this.account_list=list
      );

    this.accountAddEventEmitService.subject
      .subscribe((account: Account) => {
        console.log('add account event received!!');
        this.account_list.unshift(account);
      });
    this.accountService.getTypeList()
      .subscribe((accountTypeList: AccountType[]) => this.accountTypeList = accountTypeList)
  }

  private obj2QueryString(){
    let obj = this.filter;
    let queryString: string[] = [];
    for (let key in obj) {
      if (obj[key] !== null && obj[key] !== '')
        queryString.push(`${key}=${obj[key]}`)
    }
    return queryString.join('&')
  }

  search(){
    this.searchTerms.next(this.obj2QueryString());
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

  getCount(queryString: string) {
    this.accountService.getCount(queryString)
      .subscribe(count => this.count = count)
  }

  copyToClipBoard(str: string){
    this.clipboard.copy(str);
    let modalRef = this.modalService.open(MessageboxComponent);
    modalRef.componentInstance.msg = '密码已经拷贝到剪切板，Ctrl + V 即可粘贴使用';
  }

  addAccount(){
    let modalRef = this.modalService.open(AccountFormComponent);
    modalRef.componentInstance.formTitle = 'Account Add';
    modalRef.componentInstance.formType = 'add';
  }

  updateAccount(account: Account){
    let modalRef = this.modalService.open(AccountFormComponent);
    modalRef.componentInstance.formTitle = 'Account Edit';
    modalRef.componentInstance.formType = 'edit';

    modalRef.componentInstance.account = account;
  }

  del(account: Account){
    this.account_list.splice(this.account_list.indexOf(account),1);
    this.accountService.deleteAccount(account.pk)
      .subscribe(() => {})
  }

  findTypeById(pk){
    return this.accountTypeList.filter(e => e.pk == pk)[0].fields.type;
  }

}
