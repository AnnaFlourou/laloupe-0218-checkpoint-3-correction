export class Match {
  _id?: string;
  playerA?: string;
  playerB?: string;
  winner?: string;

  constructor(playerA, playerB) {
    this.playerA = playerA;
    this.playerB = playerB;
  }
}
