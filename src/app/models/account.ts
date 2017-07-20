export class Account {
  model: string = 'app.account';
  pk: number;
  fields: {
    username: string,
    password: string,
    desc: string,
    login_url: string,
    type: any,
  };

  constructor(
    username: string = null,
    password: string = null,
    desc: string = null,
    login_url: string = null,
    type: any = null
  ){
    this.pk = null;
    this.fields = {
      username: username,
      password: password,
      desc: desc,
      login_url: login_url,
      type: type
    };
  }
}
