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



    constructor(private http: Http) {
        this.authStatus = !!localStorage.getItem('currentUser');
        this.sToken = localStorage.getItem('currentUser');
    }


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
                    console.log("got data: " + data);
                    this.jUser = data;
                    this.userChanged.emit(this.jUser);
                }
            );
    }

}
