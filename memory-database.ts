import * as types from './types';
import { Database, CHAT_PREFIX } from './database';


/**
 *  A simple database which only lives in memory
 */
export class MemoryDatabase extends Database {
	private data: object;

	constructor() {
		super();
		this.data = {};
	}

	set(key: string, value): void {
		this.data[key] = value;
	}

	get(key: string) {
		return this.data[key];
	}


	getChat(chatid: number): types.Chat {
		// A non-validated cast is fine here, since we asserted that the
		// incoming data is correct.
		return <types.Chat> this.get(CHAT_PREFIX + chatid);
	}

	setChat(chatid: number, chat: types.Chat): void {
		if (! chat.isValid()) {
			throw new TypeError("Can't insert invalid chat!");
		}

		this.set(CHAT_PREFIX + chatid, chat);
	}

	chatExists(chatid: number): boolean {
		return typeof this.getChat(chatid) !== 'undefined';
	}


	editChat(chatid: number, edit: (_:types.Chat) => void): void {
		// Get chat
		let chat = this.getChat(chatid);

		// Create new chat if it doesn't exist
		if (typeof chat === 'undefined') {
			chat = new types.Chat({
				history: [],
			});
		}

		// Let the chat be edited
		edit(chat);

		// Store chat back in database
		this.setChat(chatid, chat);
	}

	addHistory(chatid: number, history: types.History): void {
		if (! history.isValid()) {
			throw new TypeError("Can't write fake history");
		}

		this.editChat(chatid, (chat: types.Chat) => {
			chat.history.unshift(history);
		});
	}
}


export const staticMemoryDatabase = new MemoryDatabase();
