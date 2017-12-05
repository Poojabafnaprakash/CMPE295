export class RouteGraph {

  constructor(
    public source: string,
    public destination: string,
    public dayOfWeek: string,
    public timeOfDay: string,
    public street: string,
    public direction: string
  ) { }

}
