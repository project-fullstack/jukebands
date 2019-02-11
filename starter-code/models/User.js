const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  contact: String,
  style: String,
  description: String,
  price: Number,
  localization:String,//preguntar mañana
  discography: String,
  rider: String,//equipo que tiene la banda
  // imgName: String,
  // imgPath: String,

}, {
  timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;