import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class HttpService {

    authStatus;
    authStatusChanged = new EventEmitter<Boolean>();



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

}
