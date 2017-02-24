import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { AuthService, HttpService } from './services/index';
import { RegisterComponent } from './register/register.component';
import { AddFeedComponent } from './home/add-feed/add-feed.component';


import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        RegisterComponent,
        AddFeedComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        Ng2Bs3ModalModule
    ],
    providers: [
        AuthGuard,
        GuestGuard,
        AuthService,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
