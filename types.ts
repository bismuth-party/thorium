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

export interface Message {
	type: MessageType;
	content;
}


export enum HistoryType {
	Message,

	ChatUpdate_NewMember,
	ChatUpdate_LeftMember,
	ChatUpdate_NewTitle,
	ChatUpdate_NewChatPhoto,
	ChatUpdate_DeleteChatPhoto,
}

export interface History {
	type: HistoryType;
	userid: number;
	content;
}


export interface Chat {
	history: History[];
}
