import {Injectable, EventEmitter} from '@angular/core';
import { Account } from "../models/account";

@Injectable()
export class AccountAddEventEmitService {
  subject: EventEmitter<Account>;

  constructor() {
    this.subject = new EventEmitter(true);
  }

}
