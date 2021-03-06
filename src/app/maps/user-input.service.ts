import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UserInput } from './model/userInput';
import { PredictedResults } from './model/predicted-Results';
import { LatLng } from './model/latLng';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserInputService {

  private userInputUrl = '/api/userInput';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  create(userInput: UserInput): Observable<PredictedResults[]> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.userInputUrl, userInput, options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  getLatLng(userInput: UserInput): Observable<LatLng> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post('/api/latlng', userInput, options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }

  setFavorite(userInput: UserInput): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post('/api/setFavorite', userInput, options)
      .map(success => success.json().statusCode)
      .catch(this.handleError);
  }

}
