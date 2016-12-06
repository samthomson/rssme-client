import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    private loginEmail: string = '';
    private loginPassword: string = '';

    private bAttemptingLogin: boolean = false;

    error = '';

    ngOnInit() {
    }



    onSubmit(f) {
        console.log(f.value);

        this.bAttemptingLogin = true;

        this.authService.attemptLogin(this.loginEmail, this.loginPassword)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Email or password is incorrect';
                    this.bAttemptingLogin = false;
                }
            });

        /*
          .subscribe(
              data => {
                  console.log("response from update company subscribe: " + data);
                  this.company = cTemp;
                  this.bSaving = false;
                  this.bErrorSaving = false;

                  this.toastr.success('Company data updated!', 'Saved');
              },
              err => {
                  this.bSaving = false;
                  this.bErrorSaving = true;
                  // todo: visually handle an error saving...
                  this.toastr.error('There was a problem saving', 'Not saved');
              }
          );
          */
      }

}
