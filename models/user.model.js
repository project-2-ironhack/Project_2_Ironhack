const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [true,'Name is required'],
    unique: [true,'Name must be unique']
  },
  email : {
    type: String,
    required: [true,'Email is required'],
    unique: [true,'Email must be unique'],
    match : EMAIL_PATTERN,
    trim: true,
    lowercase : true
  },
  password : {
    type: String,
    required: [true,'Password is required'],
    // Estaría bien meter aquí un match alfanumérico
    // minlength: [8, 'Password needs at last 8 chars'] 
  },
    avatarURL: String
},{timestamps:true})

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password,salt)
          .then(hash => {
            user.password = hash;
            next()
          });
      })
      .catch(error => next(error))
  }
})

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;