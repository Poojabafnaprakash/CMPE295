export class User {

  constructor(
    public password: string,
    public email: string,
    public id?: number,
    public dob?: number,
    public firstName?: string,
    public lastName?: string,
    public phone?: number
  ) {  }

}
