/**
 * Created by xiayu on 2017/7/30.
 */

export class User {
  pk?: number;
  model: string = 'auth.user';
  fields: any = {
    username: '',
    password: '',
  };
}
