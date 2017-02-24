import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService, AuthService } from './../services';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private aFeedItems = [];
    private aSubscriptions = [];

    @ViewChild('myModal')
    modal: ModalComponent;

    constructor(
        private router: Router,
        private httpService: HttpService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // this.resetAddFeedForm();

        this.httpService.getFeedItems()
            .subscribe(
                (data) => {
                    this.aFeedItems = data;
                }
            );

        this.httpService.getSubscriptions()
            .subscribe(
                (data) => {
                    this.aSubscriptions = data;
                }
            );
    }

    // resetAddFeedForm() {
    //     this.oAddFeed = this.oEmptyAddFeed;
    // }

    onLogOut() {
        this.authService.logOut();
    }
}
