const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
<<<<<<< HEAD
  password: String,
  contact: String,
  style: String,
  description: String,
  price: Number,
  localization:String,//preguntar mañana
  discography: String,
  rider: String,//equipo que tiene la banda
  imgName: String,
  imgPath: String,
  place: Object
}, {
  timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;
=======
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
>>>>>>> 260d4c35ac0f63e85d461b8ce3bdf6d3333c53e5
