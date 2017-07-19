import { Component, OnInit, Input } from '@angular/core';
import { Account } from "../../models/account";

@Component({
  selector: 'app-account-quick-editor',
  templateUrl: 'account-quick-editor.component.html',
  styleUrls: ['account-quick-editor.component.css']
})
export class AccountQuickEditorComponent implements OnInit {
  @Input() account: Account;
  constructor() { }

  ngOnInit() {
  }


}
