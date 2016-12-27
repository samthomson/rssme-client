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

    feeds: any;
    feedsChanged = new EventEmitter<any>();

    sAPI_BASE: string = 'http://rssmeapi.dev';



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
        return this.http.get(this.sAPI_BASE + '/app/auth/authenticated')
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

        return this.http.get(this.sAPI_BASE + '/app/auth/getauthed', options)
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

    getAll() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.sToken });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.sAPI_BASE + '/app/feedsandcategories', options)
            .map(
                (response: Response) => response.json()
            )
            .subscribe(
                (data) => {
                    console.log("got feeds: " + data);
                    this.feeds = data;
                    this.feedsChanged.emit(this.feeds);
                }
            );
    }
    addFeed(oNewFeed) {

        let url = this.sAPI_BASE + '/app/feeds/new';
        let authToken = localStorage.getItem('auth_token');
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers});


        let urlSearchParams = new URLSearchParams();

        urlSearchParams.append('name', oNewFeed.name);
        urlSearchParams.append('url', oNewFeed.url);

        let body = urlSearchParams.toString()

        return this.http.post(
            url,
            body,
            options
        )
        .map(
            (response: Response) => {
                let iNewFeedId = response.json().response.id;
                //this.companyBrandingDataChanged.emit(this.branding);
                return iNewFeedId;
            }
        );
    }
}
