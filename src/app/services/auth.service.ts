import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

    authStatus: boolean = false;
    authStatusChanged = new EventEmitter<Boolean>();

    sToken: string;
    authTokenChanged = new EventEmitter<string>();

    jUser: any;
    userChanged = new EventEmitter<any>();



    constructor(
        private http: Http,
        private router: Router
    ) {
        this.authStatus = !!localStorage.getItem('currentUser');
    }

    isLoggedIn() {
        return this.authStatus;
    }

    attemptLogin(sEmail, sPassword): Observable<boolean>
    {
        let jAuthParams = new URLSearchParams();
        jAuthParams.set('email', sEmail);
        jAuthParams.set('password', sPassword);

        return this.http.get('http://rssmeapi.dev/app/auth/login', { search: jAuthParams })
            .map(
                (response: Response) => {

                    let data = response.json();

                    let token = data.token;
                    let authStatus = data.authStatus;

                    if (authStatus && token) {
                        // set token property
                        this.sToken = token;

                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', token);

                        //console.log("set token as: " + localStorage.getItem('currentUser'));

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
            });
    }

    logOut()
    {
        localStorage.removeItem('currentUser');
        this.authStatus = false;
        this.authStatusChanged.emit(this.authStatus);
        // 'logout' the user (delete their local token and redirect them)

        this.router.navigate(['/login']);

    }
}
