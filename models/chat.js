import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    date: {type: Date, required: true},
    user: {type: String, required: true},
    msg: {type: String, required: true}
});

export const Chat = model('chat', chatSchema);


