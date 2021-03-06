import * as types from './types';
import * as utils from './utils';
import { Database, CHAT_PREFIX, TOKEN_PREFIX, TOKEN_SIZE } from './database';


/**
 *  A simple database which only lives in memory
 */
export class MemoryDatabase extends Database {
	protected data: object;

	constructor() {
		super();
		this.data = {};
	}

	protected set(key: string, value): void {
		this.data[key] = value;
	}

	protected get(key: string) {
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
				id: chatid,
				history: [],
				users: {},
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

	addUser(chatid: number, user: types.User): void {
		this.editChat(chatid, (chat: types.Chat) => {
			chat.addUser(user);
		});
	}

	removeUser(chatid: number, user: types.User): void {
		this.editChat(chatid, (chat: types.Chat) => {
			chat.removeUser(user);
		});
	}


	getChatsByUser(userid: number): number[] {
		let chats = [];

		Object.keys(this.data)
			.filter(x => x.startsWith(CHAT_PREFIX))
			.forEach(key => {
				let chat = new types.Chat(this.data[key]);

				if (Object.keys(chat.users).includes(userid.toString())) {
					chats.push(chat.id);
				}
			});

		return chats;
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

		let chat = this.getChat(chatid);
		if (typeof chat === 'undefined') {
			return false;
		}

		// Make sure the user is part of that chat
		for (let user of Object.values(chat.users)) {
			if (user.id === token.userid) {
				return true;
			}
		}

		return false;
	}
}
