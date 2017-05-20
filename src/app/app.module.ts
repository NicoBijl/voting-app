import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ButtonModule, CheckboxModule, InputTextModule} from 'primeng/primeng';
import {VoteCountingComponent} from './vote-counting/vote-counting.component';
import {VotingComponent} from './voting/voting.component';
import {RouterModule, Routes} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const appRoutes: Routes = [
    {
        path: 'vote',
        component: VotingComponent,
    },
    {
        path: 'count-votes',
        component: VoteCountingComponent
    },
    {
        path: 'count-votes/:index',
        component: VoteCountingComponent,
    }

];

@NgModule({
    declarations: [
        AppComponent,
        VoteCountingComponent,
        VotingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,
        MaterialModule,
        RouterModule.forRoot(
            appRoutes
        ),
        LocalStorageModule.withConfig({
            prefix: 'voting-app',
            storageType: 'localStorage'
        })
    ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
