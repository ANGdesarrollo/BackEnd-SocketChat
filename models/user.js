import { Schema, model } from "mongoose";

const UserSchema = new Schema( {
    username: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true }
} )

export default model( 'user', UserSchema );
