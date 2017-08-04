export class AccountType {
  model: 'app.accounttype';
  pk: number;
  fields: any = {};

  constructor(type: string){
    this.fields.type = type;
  }

}
