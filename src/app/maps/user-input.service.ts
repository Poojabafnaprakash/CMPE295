import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UserInput } from './model/userInput';
import { PredictedResults } from './model/predicted-Results';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserInputService {

  private userInputUrl = '/api/userInput';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(userInput: UserInput):Observable<PredictedResults> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        //console.log(userInput);
        return this.http.post(this.userInputUrl, userInput, options)
        .map(res => {
        return res.json().map(item => {
          return new PredictedResults(
              item.streetName,
              item.congestionRate
          );
        });
      })
      .catch(this.handleError);
               //.map(success => success.status)
    }

  private handleError (error: Response | any) {
		//console.error(error.message || error);
		return Observable.throw(error.status);
    }

}
