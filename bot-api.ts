import * as express from 'express';

import * as types from './types';
import { staticMemoryDatabase as database } from './memory-database';

export const router = express.Router();



// Check if connection works
router.all('/ping', (req, res) => {
	res.send_ok();
});


// Gets called when a new message is sent
router.post('/message', (req, res) => {
	let body = req.body;
	/*
	chatid: int
	userid: int
	message: Message
	*/


	try {
		database.addHistory(body.chatid, new types.History({
			type: types.HistoryType.Message,
			userid: body.userid,
			content: new types.Message(body.message),
		}));
	}
	catch(err) {
		console.error(err);
		res.send_err(err.toString());
		return;
	}

	res.send_ok();
});


// Gets called when a new member joined
router.post('/chat_update/new_member', (req, res) => {
	let body = req.body;
	/*
	chatid: int
	user: User
	*/


	try {
		database.addHistory(body.chatid, new types.History ({
			type: types.HistoryType.ChatUpdate_NewMember,
			userid: body.userid,
			content: new types.User(body.user),
		}));
	}
	catch(err) {
		console.error(err);
		res.send_err(err);
		return;
	}


	res.send_ok();
});


// Gets called when a member left
router.post('/chat_update/left_member', (req, res) => {
	let body = req.body;
	/*
	chatid: int
	userid: int
	*/


	try {
		database.addHistory(body.chatid, new types.History({
			type: types.HistoryType.ChatUpdate_LeftMember,
			userid: body.userid,
		}));
	}
	catch(err) {
		console.error(err);
		res.send_err(err);
		return;
	}


	res.send_ok();
});


// Gets called when a new title is set
router.post('/chat_update/new_title', (req, res) => {
	let body = req.body;
	/*
	chatid: int
	userid: int
	title: string
	*/


	try {
		database.addHistory(body.chatid, new types.History({
			type: types.HistoryType.ChatUpdate_NewTitle,
			userid: body.userid,
			content: body.title,
		}));
	}
	catch(err) {
		console.error(err);
		res.send_err(err);
		return;
	}


	res.send_ok();
});


// Gets called when a new chat photo is set
router.post('/chat_update/new_chat_photo', (req, res) => {
	let body = req.body;
	/*
	chatid: int
	userid: int
	photo: PhotoData
	*/


	try {
		database.addHistory(body.chatid, new types.History({
			type: types.HistoryType.ChatUpdate_NewChatPhoto,
			userid: body.userid,
			content: new types.PhotoData(body.photo),
		}));
	}
	catch(err) {
		console.error(err);
		res.send_err(err);
		return;
	}


	res.send_ok();
});


// Gets called when the chat photo is deleted
router.post('/chat_update/new_chat_photo', (req, res) => {
	let body = req.body;
	/*
	chatid: int
	userid: int
	*/


	try {
		database.addHistory(body.chatid, new types.History({
			type: types.HistoryType.ChatUpdate_DeleteChatPhoto,
			userid: body.userid,
		}));
	}
	catch(err) {
		console.error(err);
		res.send_err(err);
		return;
	}


	res.send_ok();
});
