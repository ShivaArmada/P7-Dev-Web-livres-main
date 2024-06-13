/*eslint-disable */
const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        if (validator.isEmail(value)) {
          const domain = value.split("@")[1];
          return !domain.includes("yopmail");
        }
        return false;
      },
      message: "Adresse e-mail invalide",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

// Hashing password before saving it to the database
userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.plugin(uniqueValidator);

// Création du modèle "UserUp" à partir du schéma
const UserUp = mongoose.model('UserUp', userSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = UserUp;
