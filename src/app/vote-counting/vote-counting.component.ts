import {Component, ElementRef, OnInit} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {VotingState} from '../voting.state';
import Group = VotingState.Group;
import Vote = VotingState.Vote;
import InnerVote = VotingState.InnerVote;
import {ActivatedRoute, Params} from "@angular/router";


@Component({
    selector: 'app-vote-counting',
    templateUrl: './vote-counting.component.html',
    styleUrls: ['./vote-counting.component.css']
})
export class VoteCountingComponent implements OnInit {
    public votes: Array<Vote> = [];
    public currentVoteIndex = 0;
    debugMode = false;
    private peopleList: Array<Group>;

    constructor(private element: ElementRef, private localStorageService: LocalStorageService, private activeRoute: ActivatedRoute) {
        this.peopleList = [
            {
                id: 1,
                groupName: 'Ouderlingen Zuid',
                people: [
                    {id: 1, name: 'Jan Jansen'},
                    {id: 2, name: 'Klaas-Jan van Dort'},
                    {id: 3, name: 'Mathijs van het Vriesendijks'},
                    {id: 4, name: 'Leendert Speek'}
                ],
                max: 2
            },
            {
                id: 2,
                groupName: 'Ouderlingen Noord',
                people: [
                    {id: 5, name: 'Sjaak Pietersen'},
                    {id: 6, name: 'Ad Hissink'},
                    {id: 7, name: 'Korneel van Eisen'},
                    {id: 8, name: 'Emiel Timan'},
                    {id: 9, name: 'Jan-Pieter Hazenkamp'},
                    {id: 10, name: 'Sebastiaan Stein'}
                ],
                max: 3
            },
            {
                id: 3,
                groupName: 'Diacenen Zuid',
                people: [
                    {id: 11, name: 'Gideon Wintermans'},
                    {id: 12, name: 'Maurits Abbing'},
                    {id: 13, name: 'Givano Mangnus'},
                    {id: 14, name: 'Sammy Boermans'}
                ],
                max: 2
            },
            {
                id: 4,
                groupName: 'Diacenen Noord',
                people: [
                    {id: 15, name: 'Mevlüt de Leur'},
                    {id: 16, name: 'Aydin Breur'},
                    {id: 17, name: 'Arnoldus Grootenboer'},
                    {id: 18, name: 'Kyle de Moor'}
                ],
                max: 2
            }
        ] as Array<Group>;

        if (this.localStorageService.get('votes')) {
            console.log('from local storage', this.localStorageService.get('votes'))
            this.votes = this.localStorageService.get('votes') as Array<Vote>;
            this.currentVoteIndex = this.votes.length;
        } else {
            const emptyVote = this.getEmptyVote(0);
            this.votes.push(emptyVote);
            console.log(emptyVote);
        }
    }

    get currentVote() {
        if (this.votes[this.currentVoteIndex] === undefined) {
            this.votes[this.currentVoteIndex] = this.getEmptyVote(this.currentVoteIndex);
        }
        return this.votes[this.currentVoteIndex];
    }

    public eraseVotes() {
        this.votes = [];
        this.currentVoteIndex = 0;
        this.focusOnFirstInput();
        this.localStorageService.set('votes', this.votes);
    }

    public decrementCurrentVote() {
        this.currentVoteIndex--;
        this.focusOnFirstInput();
    }

    public incrementCurrentVote() {
        console.log(' save vote: ', this.votes[this.currentVoteIndex]);
        this.localStorageService.set('votes', this.votes);
        this.currentVoteIndex++;

        this.focusOnFirstInput();
    }

    ngOnInit() {
        this.activeRoute.params
        // (+) converts string 'id' to a number
            .subscribe((params: Params) => {
                if(isNaN(+params['index'])){
                    this.currentVoteIndex = 0;
                }else{
                    this.currentVoteIndex = +params['index'];
                }
            });
    }

    getCheckboxState(groupId: Number, personId: Number) {
        if (!this.votes[this.currentVoteIndex] || !this.votes[this.currentVoteIndex].votes) {
            return false
        }
        console.log('getcheckbox state: ', groupId, personId, this.votes[this.currentVoteIndex].votes);
        return this.votes[this.currentVoteIndex].votes.findIndex(
            (value) => {
                return value.groupId == groupId && value.personId == personId;
            }) !== -1;
    }

    setCheckboxState(groupId: Number, personId: Number, value) {
        console.log('setCheckboxState, ', groupId, personId, value);
        if (!this.votes[this.currentVoteIndex]) {
            this.votes[this.currentVoteIndex] = this.getEmptyVote(this.currentVoteIndex);
        }
        if (value) {
            var innerVote = {
                groupId: groupId,
                personId: personId
            } as InnerVote;
            this.votes[this.currentVoteIndex].votes.push(innerVote);
        }else{
            this.votes[this.currentVoteIndex].votes.splice(this.getInnerVoteIndex(this.votes[this.currentVoteIndex], groupId, personId), 1);
        }
        this.localStorageService.set('votes', this.votes);
    }
    getInnerVoteIndex(vote: Vote, groupId: Number, personId: Number): number{
        return vote.votes.findIndex(
            (value) => {
                return value.groupId == groupId && value.personId == personId;
            })
    }

    private getEmptyVote(voteNumber): Vote {
        return new Vote(voteNumber);
    }

    private focusOnFirstInput() {
        this.element.nativeElement.querySelectorAll('input')[0].focus();
    }
}
