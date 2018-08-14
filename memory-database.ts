import * as types from './types';
import * as utils from './utils';
import { Database, CHAT_PREFIX, TOKEN_PREFIX, TOKEN_SIZE } from './database';


/**
 *  A simple database which only lives in memory
 */
export class MemoryDatabase extends Database {
	private data: object;

	constructor() {
		super();
		this.data = {};
	}

	private set(key: string, value): void {
		this.data[key] = value;
	}

	private get(key: string) {
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

	regenerateToken(userid: number): types.Token {
		let token = utils.randomString(TOKEN_SIZE);

		this.set(TOKEN_PREFIX + userid, token);
		return new types.Token({
			userid,
			token,
		});
	}

	verifyToken(userid: number, token: types.Token): boolean {
		if (userid !== token.userid) {
			return false;
		}

		let dbToken = this.get(TOKEN_PREFIX + userid);
		return token.token === dbToken;
	}

	validateToken(chatid: number, token: types.Token): boolean {
		// Make sure the token is valid
		if (! this.verifyToken(token.userid, token)) {
			return false;
		}

		// Make sure the user is part of that chat
		let users = this.getChat(chatid).getUsers();
		for (let user of users) {
			if (user.id === token.userid) {
				return true;
			}
		}

		return false;
	}
}
