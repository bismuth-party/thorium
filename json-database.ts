import * as fs from 'fs';

import * as types from './types';
import { Database, CHAT_PREFIX } from './database';


/**
 *  A simple database which stores data in a JSON file
 */
export class JSONDatabase extends Database {
	private data: object;
	private filename: string;

	constructor(filename: string) {
		super();
		this.filename = filename;
		this.read();
	}

	private read(): void {
		try {
			// NOTE: All type information is lost
			this.data = JSON.parse(fs.readFileSync(this.filename).toString());
		}
		catch(err) {
			this.data = {};

			// Ignore if file not found
			if (err.code !== 'ENOENT') {
				throw err;
			}
		}
	}

	private write(): void {
		// NOTE: All type information gets lost
		fs.writeFileSync(this.filename, JSON.stringify(this.data, null, '\t'));
	}

	private set(key: string, value): void {
		this.data[key] = value;
		this.write();
	}

	private get(key: string) {
		return this.data[key];
	}


	getChat(chatid: number): types.Chat {
		let chat = this.get(CHAT_PREFIX + chatid);

		if (typeof chat === 'undefined') {
			return undefined;
		}

		return new types.Chat(chat);
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
