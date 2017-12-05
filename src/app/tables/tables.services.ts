 import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserInputForPresent } from "./model/userInputForPresent";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class TablesService {

  constructor(private http: Http) { }

  congestionDetailPresent(userInput: UserInputForPresent): Observable<any> {
    return this.http.post('/api/routeCongestionDetails', userInput)
      .map(success => success.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }

}
