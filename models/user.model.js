const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL || 'admin@example.org';

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
    minlength: [8, 'Password needs at last 8 chars']
  },
    avatarURL: String
},{timestamps:true})

