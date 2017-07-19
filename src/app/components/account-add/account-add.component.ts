import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {Account} from "../../models/account";
import {AccountService} from "../../services/account.service";
import {AccountType} from "../../models/account-type";


@Component({
  selector: 'app-account-add',
  templateUrl: 'account-add.component.html',
  styleUrls: ['account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  account: Account = new Account();
  accountTypeList: AccountType[];
  constructor(
    public activeModal: NgbActiveModal,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.getTypeList()
      .subscribe((accountTypeList: AccountType[]) => this.accountTypeList = accountTypeList)
  }

}
