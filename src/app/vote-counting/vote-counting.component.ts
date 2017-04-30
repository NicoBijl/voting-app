import {Component, OnInit} from "@angular/core";
import {LocalStorageService} from "angular-2-local-storage";


class Group {
    groupName;
    people: Array<string>;
    max: number;
}

@Component({
    selector: 'app-vote-counting',
    templateUrl: './vote-counting.component.html',
    styleUrls: ['./vote-counting.component.css']
})
export class VoteCountingComponent implements OnInit {
    private peopleList: Array<Group>;
    public votes: Array<Array<Array<boolean>>> = [];
    public currentVoteIndex = 0;
    debugMode = false;

    get currentVote() {
        if (this.votes[this.currentVoteIndex] == undefined) {
            this.votes[this.currentVoteIndex] = this.getEmptyVote();
        }
        return this.votes[this.currentVoteIndex];
    }


    constructor(private localStorageService: LocalStorageService) {
        this.peopleList = [
            {
                groupName: 'Ouderlingen Zuid',
                people: ['Jan Jansen', 'Klaas-Jan van Dort', 'Mathijs van het Vriesendijks', 'Leendert Speek'],
                max: 2
            },
            {
                groupName: 'Ouderlingen Noord',
                people: ['Sjaak Pietersen', 'Ad Hissink', 'Korneel van Eisen', 'Emiel Timan', 'Jan-Pieter Hazenkamp', 'Sebastiaan Stein'],
                max: 3
            },
            {
                groupName: 'Diacenen Zuid',
                people: ['Gideon Wintermans', 'Maurits Abbing', 'Givano Mangnus', 'Sammy Boermans'],
                max: 2
            },
            {
                groupName: 'Diacenen Noord',
                people: ['Mevlüt de Leur', 'Aydin Breur', 'Arnoldus Grootenboer', 'Kyle de Moor'],
                max: 2
            },
        ];

        if (this.localStorageService.get('votes')) {
            console.log('from local storage', this.localStorageService.get('votes'))
            this.votes = this.localStorageService.get('votes') as Array<Array<Array<boolean>>>;
            this.currentVoteIndex = this.votes.length;
        } else {
            let emptyVote = this.getEmptyVote();
            this.votes.push(emptyVote);
            console.log(emptyVote);
        }
    }

    private getEmptyVote(): Array<Array<boolean>> {
        let emptyVote: Array<Array<boolean>> = this.peopleList.map((g) => {
            let pVotes: Array<boolean> = g.people.map((p) => {
                return false;
            });
            return pVotes;
        });
        return emptyVote;
    }

    public eraseVotes() {
        this.votes = [];
        this.currentVoteIndex = 0;
        this.localStorageService.set('votes', this.votes);
    }


    public decrementCurrentVote() {
        this.currentVoteIndex--;
    }

    public incrementCurrentVote() {
        this.localStorageService.set('votes', this.votes);
        this.currentVoteIndex++;
    }

    ngOnInit() {
    }

}
