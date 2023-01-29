import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    date: {type: String, required: true},
    username: {type: String, required: true, maxLength: 30, minLength: 6},
    message: {type: String, required: true}
});

export const Chat = model('chat', chatSchema);


