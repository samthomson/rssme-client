import { Component, ViewChild } from '@angular/core';
import { HttpService } from './../../services';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html'
})
export class AddFeedComponent  {

    constructor(
        private httpService: HttpService
    ) {
        this.resetAddFeedForm();
    }

    private oAddFeed;
    private oEmptyAddFeed = {
        'name': '',
        'url': ''
    };
    private errors = [];

    @ViewChild('mdlAddFeed') mdlAddFeed:any;

    onAddFeed(frmAddFeed) {
        console.log("form submitted: ");
        console.log(this.oAddFeed);
        //this.resetAddFeedForm();
        this.httpService.addFeed(this.oAddFeed)
          .subscribe((data) => {
              if(data.success)
              {
                  console.log('got response?');
                  // close modal if successfully added
                  this.mdlAddFeed.dismiss();
              }else{
                  // problem adding field
                  this.errors = data.errors;
              }
          }
      );
    }

    resetAddFeedForm() {
        this.oAddFeed = this.oEmptyAddFeed;
        this.errors = [];
    }

    onCloseAddFeedModal()
    {
        this.resetAddFeedForm();
        this.mdlAddFeed.dismiss();
    }

}
