import * as express from 'express';

import CatController from './controllers/CatController';
import UserController from './controllers/UserController';
import PlayerController from './controllers/PlayerController';
import BracketController from './controllers/BracketController';
import MatchController from './controllers/MatchController';
// import cat from './models/cat';
// import user from './models/user';

export default function routes(app) {

  const router = express.Router();

  const cat = new CatController();
  const match = new MatchController();
  const player = new PlayerController();
  const bracket = new BracketController();
  const user = new UserController();

  // cats
  router.route('/cats').get(cat.getAll);
  router.route('/cats/count').get(cat.count);
  router.route('/cat').post(cat.insert);
  router.route('/cat/:id').get(cat.get);
  router.route('/cat/:id').put(cat.update);
  router.route('/cat/:id').delete(cat.delete);

  // matches
  router.route('/matches').get(match.getAll);
  router.route('/matches/count').get(match.count);
  router.route('/match').post(match.insert);
  router.route('/match/:id').get(match.get);
  router.route('/match/:id').put(match.update);
  router.route('/match/:id').delete(match.delete);
  router.route('/matches/next').post(match.next);

  // brackets
  router.route('/brackets').get(bracket.getAll);
  router.route('/brackets/count').get(bracket.count);
  router.route('/bracket').post(bracket.insert);
  router.route('/bracket/:id').get(bracket.get);
  router.route('/bracket/:id').put(bracket.update);
  router.route('/bracket/:id').delete(bracket.delete);
  router.route('/brackets/generate').post(bracket.generateBrackets);
  router.route('/brackets/next').post(bracket.next);

  // players
  router.route('/players').get(player.getAll);
  router.route('/players/count').get(player.count);
  router.route('/player').post(player.insert);
  router.route('/player/:id').get(player.get);
  router.route('/player/:id').put(player.update);
  router.route('/player/:id').delete(player.delete);
  router.route('/players/reset').post(player.reset);

  // users
  router.route('/login').post(user.login);
  router.route('/users').get(user.getAll);
  router.route('/users/count').get(user.count);
  router.route('/user').post(user.insert);
  router.route('/user/:id').get(user.get);
  router.route('/user/:id').put(user.update);
  router.route('/user/:id').delete(user.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
