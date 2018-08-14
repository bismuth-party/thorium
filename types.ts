import {
	Validate,
	validate,
	validate_optional,
	validate_array_of,
	validate_fn,
} from './validate';

import { TOKEN_SIZE } from './database';



export enum MessageType {
	Text,
	Audio,
	Document,
	Animation,
	Game,
	Photo,
	Sticker,
	Video,
	Voice,
	Videonote,
	Contact,
	Location,
	Venue,
}

export class Message extends Validate {
	@validate
	type: MessageType;

	@validate_optional
	content?: any;
}


export enum HistoryType {
	Message,
	Message_Edit,

	ChatUpdate_NewMember = 10,
	ChatUpdate_LeftMember,
	ChatUpdate_NewTitle,
	ChatUpdate_NewChatPhoto,
	ChatUpdate_DeleteChatPhoto,
}

export class History extends Validate {
	@validate
	type: HistoryType;

	@validate
	userid: number;

	@validate
	date: Date;

	@validate_optional
	content?: any;
}


export class User extends Validate {
	@validate
	id: number;

	@validate
	is_bot: boolean;

	@validate
	first_name: string;

	@validate_optional
	last_name?: string;

	@validate_optional
	username?: string;

	@validate_optional
	langauge_code?: string;
}


export class PhotoData extends Validate {
	@validate
	file_id: string;

	@validate
	width: number;

	@validate
	height: number;

	@validate_optional
	file_size?: number;
}


export class Chat extends Validate {
	@validate_array_of(History)
	history: History[];


	getUsers(): User[] {
		return this.history
			.filter((hist) => hist.type === HistoryType.ChatUpdate_NewMember)
			.map((hist) => new User(hist.content));
	}
}


export class Token extends Validate {
	@validate
	userid: number;

	@validate_fn((x) => /^[a-f0-9]+$/.test(x) && x.length === TOKEN_SIZE)
	token: string;


	toString() {
		return this.userid + '+' + this.token;
	}

	toJSON() {
		return this.toString();
	}

	static fromString(str: string): Token {
		let [_userid, _token] = str.split('+', 2);

		return new Token({
			userid: parseInt(_userid),
			token: _token,
		});
	}
}
