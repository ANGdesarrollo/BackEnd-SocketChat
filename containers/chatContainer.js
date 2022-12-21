import {log} from "../utils/logger.js";

export class ChatClass {
    constructor(collection) {
        this.collection = collection;
    }

    async save(message) {
        try {
            return await message.save();
        } catch (err) {
            log.info(err);
            throw new Error('Server Error');
        }
    };

    async getChats() {
        try {
            return await this.collection.find();
        } catch (err) {
            log.info(err);
            throw new Error('Server Error');
        }
    }
}
