import * as types from './types';

export const CHAT_PREFIX = 'chat/';


export abstract class Database {
	constructor() {
	}

	abstract getChat(chatid: number): types.Chat;
	abstract setChat(chatid: number, chat: types.Chat): void;
	abstract chatExists(chatid: number): boolean;
	abstract editChat(chatid: number, edit: (_:types.Chat) => void): void;
	abstract addHistory(chatid: number, history: types.History): void;
}
