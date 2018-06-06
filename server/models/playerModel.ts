import * as mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String
});

const playerModel = mongoose.model('player', playerSchema);

export default playerModel;
