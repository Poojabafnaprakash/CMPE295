export class UserInput {

  constructor(
    public id: number,
    public source: string,
    public destination: string,
    public time?: number,
    public day?: string
  ) {  }

}
