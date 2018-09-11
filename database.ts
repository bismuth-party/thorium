import * as types from './types';

export const CHAT_PREFIX = 'chat/';
export const TOKEN_PREFIX = 'token/';
export const TOKEN_SIZE = 8;


export abstract class Database {
	constructor() {
	}

	abstract getChat(chatid: number): types.Chat;
	abstract setChat(chatid: number, chat: types.Chat): void;
	abstract chatExists(chatid: number): boolean;
	abstract editChat(chatid: number, edit: (_:types.Chat) => void): void;
	abstract addHistory(chatid: number, history: types.History): void;

	abstract addUser(chatid: number, user: types.User): void;
	abstract removeUser(chatid: number, user: types.User): void;

	abstract getChatsByUser(userid: number): number[];

	abstract regenerateToken(userid: number): types.Token;

	/**
	*  Make sure the token matches the userid
	*/
	abstract verifyToken(userid: number, token: types.Token): boolean;

	/**
	*  Make sure the token has access to the chatid
	*/
	abstract validateToken(chatid: number, token: types.Token): boolean;
}
