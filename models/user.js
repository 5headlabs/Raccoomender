// Importing Node packages required for schema
const mongoose    = require('mongoose');
const bcrypt      = require('bcrypt');
const ROLE_MEMBER = require('../constants').ROLE_MEMBER;

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
  email: {
    type:      String,
    lowercase: true,
    unique:    true,
    required:  true
  },
  password: {
    type:     String,
    required: true
  },
  username: {
    type:     String, 
    unique:   true,
    required: true
  },
  role: {
    type:    String,
    enum:    [ROLE_MEMBER],
    default: ROLE_MEMBER
  },
  resetPasswordToken:   { type: String },
  resetPasswordExpires: { type: Date }
},
  {
    timestamps: true
  });

//= ===============================
// User ORM Methods
//= ===============================

UserSchema.pre('save', function (next) {
  const user = this;
  const SALT_ROUNDS = 5;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return done(err); }

    done(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
