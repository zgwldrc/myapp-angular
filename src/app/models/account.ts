export class Account {
  model: 'app.account';
  pk: number;
  fields: {
    username: string,
    password: string,
    desc: string,
    login_url: string,
    owner: any,
    type: any,
  };

  constructor(
    username: string,
    password: string,
    desc: string,
    login_url: string,
    owner: any,
    type: any
  ){
    this.pk = null;
    this.fields.username = username;
    this.fields.password = password;
    this.fields.desc = desc;
    this.fields.login_url = login_url;
    this.fields.owner = owner;
    this.fields.type = type;
  }
}
