import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService, AuthService]
})
export class AppComponent implements OnInit {

    bAuthenticated: boolean = false;
    sToken: string = '';
    jUser: any;

    constructor(
        private router: Router,
        private httpService: HttpService,
        private authService: AuthService
    ) { }

	/*
    onStore() {
		this.httpService.storeData()
			.subscribe(
				data => console.log(data),
				error => console.log(error)
			);
	}
    */
	onCheck() {
		this.bAuthenticated = this.authService.isLoggedIn();
	}

    ngOnInit() {
        // main 'entry point' of the app

        // let's check and see if the user is 'logged in' (has an auth token in local storage)
        // if(this.authService.isLoggedIn())
        // {
        //     this.httpService.getFeedItems();
        // }

        // if they have it, make a call to the server for their feeds, and in the process find out if their token is still active

        this.authService.authStatusChanged.subscribe(
            (bAuthed: boolean) => this.bAuthenticated = bAuthed
        );
        this.authService.authTokenChanged.subscribe(
            (sToken: string) => this.sToken = sToken
        );
        this.httpService.userChanged.subscribe(
            (jUser: any) => this.jUser = jUser
        );
    }

    onLogIn() {
        //this.authService.attemptLogin();
    }

    // onGetUser() {
    //     this.httpService.getUser();
    // }
}
