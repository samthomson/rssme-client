import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class HttpService {

    authStatus: boolean = false;
    authStatusChanged = new EventEmitter<Boolean>();

    sToken: string;
    authTokenChanged = new EventEmitter<string>();

    jUser: any;
    userChanged = new EventEmitter<any>();



    constructor(private http: Http) { }


/*
  storeData() {
      const body = JSON.stringify(this.recipes);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.put('https://recipebook-27463.firebaseio.com/recipes.json', body, {headers: headers})
  }
*/
    getAuthStatus() {
        return this.http.get('http://rssmeapi.dev/app/auth/authenticated')
            .map(
                (response: Response) => response.json()
            )
            .subscribe(
                (data) => {
                    this.authStatus = data.authStatus;
                    this.authStatusChanged.emit(this.authStatus);
                }
            );
    }
    getUser() {

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.sToken });

        let options = new RequestOptions({ headers: headers });



        return this.http.get('http://rssmeapi.dev/app/auth/getauthed', options)
            .map(
                (response: Response) => response.json()
            )
            .subscribe(
                (data) => {
                    this.jUser = data;
                    this.userChanged.emit(this.jUser);
                }
            );
    }

    attemptLogin() {

        let sEmail = 'samt@samt.st';


        let jAuthParams = new URLSearchParams();
        jAuthParams.set('email', sEmail);
        jAuthParams.set('password', 'sam');

        return this.http.get('http://rssmeapi.dev/app/auth/login', { search: jAuthParams })
            .map(
                (response: Response) => response.json()
            )
            .subscribe(
                (data) => {

                    let token = data.token;
                    let authStatus = data.authStatus;

                    if (token) {
                        // set token property
                        this.sToken = token;

                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ email: sEmail, token: token }));

                        this.authStatus = authStatus;
                        this.authStatusChanged.emit(this.authStatus);

                        this.sToken = token;
                        this.authTokenChanged.emit(this.sToken);

                        // return true to indicate successful login
                        return true;
                    }else{
                        // return false to indicate failed login
                        return false;
                    }

                    /*
                    this.authStatus = data.authStatus;
                    this.authStatusChanged.emit(this.authStatus);

                    this.sToken = data.token;
                    this.authTokenChanged.emit(this.sToken);*/
                }
            );
    }

}
