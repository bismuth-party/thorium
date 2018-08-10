import * as types from './types';

const CHAT_PREFIX = 'chat/';


class Database {
	data: object = {};

	set(key: string, value): void {
		this.data[key] = value;
	}

	get(key: string) {
		return this.data[key];
	}


	getChat(chatid: number): types.Chat {
		return <types.Chat> this.get(CHAT_PREFIX + chatid);
	}

	chatExists(chatid: number): boolean {
		return typeof this.get(CHAT_PREFIX + chatid) !== 'undefined';
	}


	editChat(chatid: number, edit: (_:types.Chat) => void) {
		// Get chat
		let chat = this.get(CHAT_PREFIX + chatid);

		// Create new one if it doesn't exist
		if (typeof chat === 'undefined') {
			chat = <types.Chat> {
				history: [],
			};
		}

		// Let the chat be edited
		edit(chat);

		// Store chat back in database
		this.set(CHAT_PREFIX + chatid, chat);
	}
}


export default new Database();
