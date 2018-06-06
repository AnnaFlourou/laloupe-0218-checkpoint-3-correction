import { PlayerService } from './../services/player.service';
import { Match } from './../shared/models/match.model';
import { MatchService } from './../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: Match[];

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    this.matchService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });
  }

  won(match: Match, playerLetter: string) {
    if (playerLetter == 'a') {
      match.winner = match.playerA;
    } else {
      match.winner = match.playerB;
    }
    this.updateMatch(match);
  }

  updateMatch(match: Match) {
    this.matchService.editMatch(match).subscribe(res => {
      this.getMatches();
    });
  }

  getRemainingMatches(): number {
    let remainingMatches = 0;
    for (let match of this.matches) {
      if (!match.winner) {
        remainingMatches++;
      }
    }
    return remainingMatches;
  }

  next() {
    if (this.matches.length == 1) {
      this.playerService.winner = this.matches[0].winner;
      this.router.navigate(['/winner']);
    } else {
      this.matchService.next().subscribe((data) => {
        this.getMatches();
      })
    }
  }
}
