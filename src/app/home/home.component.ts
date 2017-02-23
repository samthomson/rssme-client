import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, AuthService } from './../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private oAddFeed;
    private oEmptyAddFeed = {
        'name': '',
        'url': ''
    };

    private aFeedItems = [];

    constructor(
        private router: Router,
        private httpService: HttpService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.resetAddFeedForm();

        this.httpService.getFeedItems()
            .subscribe(
                (data) => {
                    this.aFeedItems = data;
                }
            );
    }

    resetAddFeedForm() {
        this.oAddFeed = this.oEmptyAddFeed;
    }

    onAddFeed(frmAddFeed) {
        console.log("form submitted: ");
        console.log(this.oAddFeed);
        //this.resetAddFeedForm();
        this.httpService.addFeed(this.oAddFeed)
            .subscribe(data => console.log('got response?'));
    }

    onLogOut() {
        this.authService.logOut();
    }

}
