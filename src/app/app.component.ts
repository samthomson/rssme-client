import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

    bAuthenticated: boolean = false;

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
        )
    }
}
