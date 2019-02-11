const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  style: String,
  description: String,
  price: Number,
  position:String,//preguntar mañana
  contact: String,
  discography: String,
  rider: String,//equipo que tiene la banda
  img: String

}, {
  timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;