import { Match } from './../../client/app/shared/models/match.model';
import { Bracket } from './../../client/app/shared/models/bracket.model';
import { Player } from './../../client/app/shared/models/player.model';
import bracketModel from '../models/bracketModel';
import playerModel from '../models/playerModel';
import BaseController from './BaseController';
import matchModel from '../models/matchModel';

export default class BracketController extends BaseController {
  model = bracketModel;
  ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  generateBrackets = (req, res) => {
    this.model.remove({}, err => {
      playerModel.find({}, (err, players: Player[]) => {
        if (err) { return console.error(err); }
        if (players.length % 4 != 0) {
          return console.error("Player number must be a multiple of 4");
        }
        players = this.shuffle(players);

        let i = 0;
        while (i < players.length) {
          this.createBracket(res, this.ALPHABET[i / 4], players[i], players[i + 1], players[i + 2], players[i + 3]);
          i += 4;
        }

        res.status(200).json({ status: "ok" });
      });
    });
  }

  createBracket(res, name, ...players: Player[]) {
    const bracket = new Bracket();
    bracket.name = name;
    bracket.matches = this.generateMatches(players);

    const obj = new this.model(bracket);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
    });
  }

  generateMatches(players: Player[]) {
    return [
      new Match(players[0].name, players[1].name),
      new Match(players[0].name, players[2].name),
      new Match(players[0].name, players[3].name),
      new Match(players[1].name, players[2].name),
      new Match(players[1].name, players[3].name),
      new Match(players[2].name, players[3].name),
    ];
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  next = (req, res) => {
    matchModel.remove({}, err => {
      this.model.find({}, (err, brackets) => {
        if (err) { return console.error(err); }
        let allBestPlayers = [];
        for (let bracket of brackets) {
          const bestPlayers = this.getTwoBestPlayers(bracket);
          allBestPlayers.push(...bestPlayers);
        }
        allBestPlayers = this.shuffle(allBestPlayers);
        this.createMatches(res, allBestPlayers);
      });
    });
  }

  async createMatches(res, players: string[]) {
    const promises = [];
    let i = 0;
    while (i < players.length) {
      let playerA = players[i];
      let playerB = players[i + 1];
      let match = new Match(playerA, playerB);
      const obj = new matchModel(match);
      try {
        await obj.save();
      } catch (e) {
        res.sendStatus(500).json(e);
      }
      i += 2;
    }
    res.json({ 'status': 'ok' });
  }

  getTwoBestPlayers(bracket: Bracket): string[] {
    const players = {};
    for (let match of bracket.matches) {
      let winner = match.winner;
      if (players[winner]) {
        players[winner] += 1;
      } else {
        players[winner] = 1;
      }
    }
    let arr = Object.entries(players);
    arr = arr.sort(((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      } else if (a[1] < b[1]) {
        return 1;
      } else {
        return 0;
      }
    }));
    return [arr[0][0], arr[1][0]];
  }
}
