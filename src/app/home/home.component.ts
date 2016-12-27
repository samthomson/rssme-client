import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    private oAddFeed;
    private oEmptyAddFeed = {
        'name': '',
        'url': ''
    };

    constructor(
        private httpService: HttpService
    ) {

    }



    ngOnInit() {
        this.resetAddFeedForm();
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

}
