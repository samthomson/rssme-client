import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

    bAuthenticated: boolean = false;
    sToken: string = '';
    jUser: any;

    constructor(private httpService: HttpService) { }

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
		this.httpService.getAuthStatus();
	}

    ngOnInit() {
        this.httpService.authStatusChanged.subscribe(
            (bAuthed: boolean) => this.bAuthenticated = bAuthed
        );
        this.httpService.authTokenChanged.subscribe(
            (sToken: string) => this.sToken = sToken
        );
        this.httpService.userChanged.subscribe(
            (jUser: any) => this.jUser = jUser
        );
    }

    onLogIn() {
        this.httpService.attemptLogin();
    }

    onGetAuthed() {
        this.httpService.getUser();
    }
}
