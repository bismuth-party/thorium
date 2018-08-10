import * as express from 'express';

import * as types from './types';
import database from './database';


let router = express.Router();


// Check if connection works
router.all('/ping', (req, res) => {
	res.send({ ok: true });
	res.end();
});


// Gets called when a new message is sent
router.post('/message', (req, res) => {
	let msg = req.body;
	/*
	chatid: int
	userid: int
	message: Message
	*/


	database.editChat(msg.chatid, (chat: types.Chat) => {
		chat.history.push(<types.History> {
			type: types.HistoryType.Message,
			userid: msg.userid,
			content: <types.Message> msg.message.content,
		});
	});


	res.send({ ok: true });
	res.end();
});


// Gets called when a new title is set
router.post('/chat_update/new_title', (req, res) => {
	let msg = req.body;
	/*
	chatid: int
	userid: int
	title: string
	*/


	database.editChat(msg.chatid, (chat: types.Chat) => {
		chat.history.push(<types.History> {
			type: types.HistoryType.ChatUpdate_NewTitle,
			userid: msg.userid,
			content: msg.title,
		});
	});


	res.send({ ok: true });
	res.end();
});


export {
	router
}
