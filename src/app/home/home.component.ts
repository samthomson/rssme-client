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

    private iPage = 1;
    private iCurrentFeed = null;

    constructor(
        private router: Router,
        private httpService: HttpService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // this.resetAddFeedForm();

        this.httpService.getFeedItems(this.iPage)
            .subscribe(
                (data) => {
                    this.aFeedItems = data;
                }
            );

        this.loadSubscriptions();

        this.httpService.subscriptionsChanged.subscribe(
            (data) => {
                this.loadSubscriptions()
            }
        )
    }

    loadSubscriptions()
    {
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

    onLoadMore() {
        // ask for more feed items, passing the id of the last feeditem we got as a cursor
        let sCursor = this.aFeedItems[this.aFeedItems.length-1].id;
        this.iPage++;

        this.httpService.getFeedItems(this.iPage)
            .subscribe(
                (data) => {
                    this.aFeedItems = this.aFeedItems.concat(data);
                }
            );
    }

    onLoadFeed(iFeedId)
    {
        // load feeditems for a specific feed
        this.iPage = 1;
        this.iCurrentFeed = iFeedId;
        this.httpService.getFeedItems(this.iPage, this.iCurrentFeed)
            .subscribe(
                (data) => {
                    this.aFeedItems = data;
                }
            );
    }

}
