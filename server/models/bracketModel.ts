import * as mongoose from 'mongoose';

const bracketSchema = new mongoose.Schema({
  name: String,
  matches: [mongoose.Schema.Types.Mixed]
});

const bracketModel = mongoose.model('bracket', bracketSchema);

export default bracketModel;
