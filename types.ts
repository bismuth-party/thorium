import {
	Validate,
	validate,
	validate_optional,
	validate_array_of,
	validate_fn,
	validate_optional_fn,
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
	VideoNote,
	Contact,
	Location,
	Venue,
}


function validate_message_content(content: any, target: any): boolean {
	switch (target.type) {
	case MessageType.Text:
		new Message_Text(content);
		break;

	case MessageType.Audio:
		new Message_Audio(content);
		break;

	case MessageType.Document:
		new Message_Document(content);
		break;

	case MessageType.Animation:
		new Message_Animation(content);
		break;

	case MessageType.Game:
		new Message_Game(content);
		break;

	case MessageType.Photo:
		new Message_Photo(content);
		break;

	case MessageType.Sticker:
		new Message_Sticker(content);
		break;

	case MessageType.Video:
		new Message_Video(content);
		break;

	case MessageType.Voice:
		new Message_Voice(content);
		break;

	case MessageType.VideoNote:
		new Message_VideoNote(content);
		break;

	case MessageType.Contact:
		new Message_Contact(content);
		break;

	case MessageType.Location:
		new Message_Location(content);
		break;

	case MessageType.Venue:
		new Message_Venue(content);
		break;

	default:
		return false;
	}

	return true;
}


export class Message extends Validate {
	@validate
	type: MessageType;

	@validate_optional_fn(validate_message_content)
	content?: object;
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

	@validate
	users: object;


	addUser(user: User): void {
		this.users[user.id] = user;
	}

	removeUser(user: User): void {
		delete this.users[user.id];
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




export class Message_Text extends Validate {
	@validate
	text: string;
}


class File extends Validate {
	@validate_optional
	caption?: string;

	@validate
	file_id: string;

	@validate_optional
	mime_type?: string;

	@validate_optional
	file_size?: number;
}


export class Message_Audio extends File {
	@validate
	duration: number;

	@validate_optional
	performer?: string;

	@validate_optional
	title?: string;
}

export class Message_Document extends File {
	@validate_optional
	file_name?: string;
}

export class Message_Animation extends File {
	@validate
	duration: number;
}

export class Message_Game extends Validate {
	@validate
	title: string;

	@validate
	description: string;
}

export class Message_Photo extends Validate {
	@validate_optional
	caption?: string;

	@validate
	photo: PhotoData;
}

export class Message_Sticker extends Validate {
	@validate
	file_id: string;

	@validate_optional
	emoji?: string;

	@validate_optional
	set_name?: string;

	@validate_optional
	file_size?: number;
}

export class Message_Video extends File {
	@validate
	duration: number;
}

export class Message_Voice extends File {
	@validate
	duration: number;
}

export class Message_VideoNote extends Validate {
	@validate
	file_id: string;

	@validate
	duration: number;

	@validate_optional
	file_size?: number;
}

export class Message_Contact extends Validate {
	@validate
	phone_number: string;

	@validate
	first_name: string;

	@validate_optional
	last_name?: string;

	@validate_optional
	user_id?: number;

	@validate_optional
	vcard?: string;
}

export class Message_Location extends Validate {
	@validate
	longitude: number;

	@validate
	latitude: number;
}

export class Message_Venue extends Validate {
	@validate
	location: Message_Location;

	@validate
	title: string;

	@validate
	address: string;
}
