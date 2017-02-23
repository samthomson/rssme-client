import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    private loginEmail: string = '';
    private loginPassword: string = '';

    private bAttemptingLogin: boolean = false;

    private error = '';


    onSubmit(f) {
        console.log(f.value);

        this.bAttemptingLogin = true;

        this.authService.attemptLogin(this.loginEmail, this.loginPassword)
            .subscribe(
                result => {
                    this.bAttemptingLogin = false;
                    if (result === true) {
                        // login successful
                        this.router.navigate(['/']);
                    }
                },
                err => {
                    this.bAttemptingLogin = false;
                    this.error = 'Email or password is incorrect';
                }
            );
      }

}
