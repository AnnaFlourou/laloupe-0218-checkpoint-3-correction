import { Match } from './../shared/models/match.model';
import { Bracket } from './../shared/models/bracket.model';
import { BracketService } from './../services/bracket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
  private id: string;
  private bracket: Bracket;

  constructor(private route: ActivatedRoute,
    private bracketService: BracketService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBracket();
  }

  getBracket() {
    this.bracketService.getBracket(this.id).subscribe(bracket => {
      this.bracket = bracket;
    });
  }

  won(match: Match, playerLetter: string) {
    if (playerLetter == 'a') {
      match.winner = match.playerA;
    } else {
      match.winner = match.playerB;
    }
    this.updateBracket();
  }

  updateBracket() {
    this.bracketService.editBracket(this.bracket).subscribe(res => {
      this.getBracket();
    });
  }
}
