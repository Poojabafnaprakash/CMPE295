import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserInput } from "./model/userInput";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserUpdateService {

  constructor(private http: Http) { }

  updateProfile(userInput: UserInput):Observable<any> {
          console.log(userInput);
          return this.http.post('/api/updateProfile', userInput)
                 .map(success => success.status)
                 .catch(this.handleError);
    }
  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }

}
