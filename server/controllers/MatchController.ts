import { Match } from './../../client/app/shared/models/match.model';
import matchModel from '../models/matchModel';
import BaseController from './BaseController';

export default class MatchController extends BaseController {
  model = matchModel;

  next = (req, res) => {
    this.model.find({}, (err, matches) => {
      if (err) { return console.error(err); }
      const winners = this.getWinners(matches);
      this.model.remove({}, err => {
        this.createMatches(res, winners);
      });
    });
  }

  getWinners(matches: Match[]): string[] {
    const winners = [];
    for (let match of matches) {
      winners.push(match.winner);
    }
    return winners;
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
}
