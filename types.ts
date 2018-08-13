import { Validate, validate, validate_optional } from './validate';


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

	@validate
	content: any;
}


export enum HistoryType {
	Message,
	Message_Edit,

	ChatUpdate_NewMember,
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

	@validate
	content: any;
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
	@validate
	history: History[];
}
