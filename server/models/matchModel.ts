import * as mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  playerA: String,
  playerB: String,
  winner: String,
});

const matchModel = mongoose.model('match', matchSchema);

export default matchModel;
