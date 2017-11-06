import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { User } from './model/user';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  private userUrl = '/api/checklogin';  // URL to web API
  //private userInputUrl = 'http://localhost:3000/api/userInput';
  private headers = new Headers({'Content-Type': 'application/json'});

  private isUserLoggedIn;

  constructor(private http: Http) {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

  login(user: User):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(user);
        return this.http.post(this.userUrl, user, options)
               .map(success => success.json().statusCode)
               .catch(this.handleError);
  }

  register(user: User):Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          console.log(user);
          return this.http.post('/api/register', user, options)
                 .map(success => success.status)
                 .catch(this.handleError);
    }

  private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }

}
