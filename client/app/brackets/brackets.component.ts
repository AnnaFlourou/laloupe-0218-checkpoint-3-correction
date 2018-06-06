import { Router } from '@angular/router';
import { Bracket } from './../shared/models/bracket.model';
import { BracketService } from './../services/bracket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {

  brackets: Bracket[];

  constructor(
    private bracketService: BracketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bracketService.getBrackets().subscribe(brackets => {
      this.brackets = brackets;
    });
  }

  getRemainingMatches(bracket: Bracket): number {
    let remainingMatches = 0;
    for (let match of bracket.matches) {
      if (!match.winner) {
        remainingMatches++;
      }
    }
    return remainingMatches;
  }

  getAllRemainingMatches() {
    let remainingMatches = 0;
    for (let bracket of this.brackets) {
      remainingMatches += this.getRemainingMatches(bracket);
    }
    return remainingMatches;
  }

  next() {
    this.bracketService.next().subscribe((data) => {
      this.router.navigate(['/matches']);
    })
  }
}
