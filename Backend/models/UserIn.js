/*eslint-disable*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définition du schéma de la collection "users"
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
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

// Création du modèle "UserIn" à partir du schéma
const UserIn = mongoose.model('UserIn', userSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = UserIn;