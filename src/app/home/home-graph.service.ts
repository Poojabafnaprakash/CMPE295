import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RouteGraph } from "./model/routegraph";
import { GraphData } from "./model/graphdata";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeGraphService {

  constructor(private http: Http) { }

  routeTravelTimeMethod(routeTavelTime: RouteGraph): Observable<GraphData[]> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post('/api/routeTavelTime', routeTavelTime, options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  routeCongestionTimeMethod(routeCongestionRate: RouteGraph): Observable<GraphData[]> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post('/api/routeCongestionRate', routeCongestionRate, options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }

}
