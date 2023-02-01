const {model, Schema} = require("mongoose");


const UserSchema = new Schema( {
    username: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true }
} )

const User = model( 'user', UserSchema );

module.exports = User;