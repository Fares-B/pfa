const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { USER_TYPE } = require("./type");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: String,
    userType: { type: String, enum: Object.values(USER_TYPE), default: USER_TYPE.CLIENT },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    company: {
        establishment: Number,
        user: Number,
    },
    // need password crypted
    password: {
        type: String,
        required: true,
    },
    deleted: { type: Boolean, default: false },
});


UserSchema.pre('save', async function (next) {
    this.__v = this.__v + 1;
    this.updatedAt = new Date();
    // only hash the password if it has been modified (or is new)
    const options = this.$__.saveOptions;
    if (!options.newPassword) return next();
    // generate a salt
    const SALT_ROUNDS = 10;
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// automatically add createdAt and updatedAt
UserSchema.set("timestamps", true);

// user have uniq email and userType
UserSchema.index({ email: 1, userType: 1 }, { unique: true });

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
