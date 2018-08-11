import * as types from './types';

export const CHAT_PREFIX = 'chat/';

export abstract class Database {
	uuid: string;

	constructor() {
		this.uuid = Math.floor((1 << 16) * (Math.random() + 1)).toString(16);
	}

	abstract set(key: string, value: any): void;
	abstract get(key: string): any;

	abstract getChat(chatid: number): types.Chat;
	abstract setChat(chatid: number, chat: types.Chat): void;
	abstract chatExists(chatid: number): boolean;
	abstract editChat(chatid: number, edit: (_:types.Chat) => void): void;
	abstract addHistory(chatid: number, history: types.History): void;
}
