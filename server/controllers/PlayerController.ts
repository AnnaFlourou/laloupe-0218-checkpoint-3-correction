import playerModel from '../models/playerModel';
import BaseController from './BaseController';

export default class PlayerController extends BaseController {
  model = playerModel;

  reset = (req, res) => {
    this.model.remove({}, err => {
      res.json({'status': 'ok'});
    });
  }
}
