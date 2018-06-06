import { BracketService } from './../services/bracket.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PlayerService } from '../services/player.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Player } from '../shared/models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {

  player = new Player();
  players: Player[] = [];
  isLoading = true;
  isEditing = false;

  addPlayerForm: FormGroup;
  name = new FormControl('', Validators.required);

  constructor(private playerService: PlayerService,
    private bracketService: BracketService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getPlayers();
    this.addPlayerForm = this.formBuilder.group({
      name: this.name
    });
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      data => this.players = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addPlayer() {
    this.playerService.addPlayer(this.addPlayerForm.value).subscribe(
      (res) => {
        this.players.push(res);
        this.addPlayerForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(player: Player) {
    this.isEditing = true;
    this.player = player;
  }

  cancelEditing() {
    this.isEditing = false;
    this.player = new Player();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the players to reset the editing
    this.getPlayers();
  }

  editPlayer(player: Player) {
    this.playerService.editPlayer(player).subscribe(
      () => {
        this.isEditing = false;
        this.player = player;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deletePlayer(player: Player) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.playerService.deletePlayer(player).subscribe(
        () => {
          const pos = this.players.map(elem => elem._id).indexOf(player._id);
          this.players.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

  generateBrackets() {
    console.log("Generate Brackets");
    this.bracketService.generateBrackets().subscribe(data => {
      this.router.navigate(['/brackets']);
    })
  }

  reset() {
    this.playerService.reset().subscribe((data) => {
      this.getPlayers();
    });
  }

}
