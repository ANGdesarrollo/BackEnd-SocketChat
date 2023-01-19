import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    date: {type: String, required: true},
    user: {type: String, required: true, maxLength: 30, minLength: 6},
    msg: {type: String, required: true}
});

export const Chat = model('chat', chatSchema);


