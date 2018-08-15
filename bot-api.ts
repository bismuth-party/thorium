import * as express from 'express';

import * as types from './types';
import { Validate, validate, validate_optional } from './validate';

import './express-extension';


export const router = express.Router();



// Check if connection works
router.all('/ping', (req, res) => {
	res.send_ok();
});


// Gets called when a new message is sent
router.post('/message', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
		@validate	message: types.Message;
	}

	let body = new Body(req.body);


	req.database.addUser(body.chatid, body.user);

	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.Message,
		userid: body.user.id,
		date: new Date(),
		content: body.message,
	}));

	res.send_ok();
});


// Gets called when a message is edited
router.post('/message_edit', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
		@validate	message: types.Message;
	}

	let body = new Body(req.body);

	req.database.addUser(body.chatid, body.user);

	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.Message_Edit,
		userid: body.user.id,
		date: new Date(),
		content: body.message,
	}));

	res.send_ok();
});


// Gets called when a new member joined
router.post('/chat_update/new_member', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
		@validate	newuser: types.User;
	}

	let body = new Body(req.body);

	req.database.addUser(body.chatid, body.user);
	req.database.addUser(body.chatid, body.newuser);

	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.ChatUpdate_NewMember,
		userid: body.user.id,
		date: new Date(),
		content: body.user,
	}));

	res.send_ok();
});


// Gets called when a member left
router.post('/chat_update/left_member', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
		@validate	leftuser: types.User;
	}

	let body = new Body(req.body);

	req.database.removeUser(body.chatid, body.user);

	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.ChatUpdate_LeftMember,
		userid: body.user.id,
		date: new Date(),
		content: body.user,
	}));

	res.send_ok();
});


// Gets called when a new title is set
router.post('/chat_update/new_title', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
		@validate	title: string;
	}

	let body = new Body(req.body);

	req.database.addUser(body.chatid, body.user);

	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.ChatUpdate_NewTitle,
		userid: body.user.id,
		date: new Date(),
		content: body.title,
	}));

	res.send_ok();
});


// Gets called when a new chat photo is set
router.post('/chat_update/new_chat_photo', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
		@validate	photo: types.PhotoData;
	}

	let body = new Body(req.body);

	req.database.addUser(body.chatid, body.user);

	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.ChatUpdate_NewChatPhoto,
		userid: body.user.id,
		date: new Date(),
		content: body.photo,
	}));

	res.send_ok();
});


// Gets called when the chat photo is deleted
router.post('/chat_update/delete_chat_photo', (req, res) => {
	class Body extends Validate {
		@validate	chatid: number;
		@validate	user: types.User;
	}

	let body = new Body(req.body);

	req.database.addUser(body.chatid, body.user);


	req.database.addHistory(body.chatid, new types.History({
		type: types.HistoryType.ChatUpdate_DeleteChatPhoto,
		userid: body.user.id,
		date: new Date(),
	}));

	res.send_ok();
});


// Generate a token for the user to authenticate with
router.get('/generate_token/:user_id', (req, res) => {
	let user_id = parseInt(req.params.user_id);
	let token = req.database.regenerateToken(user_id);

	res.send_ok({
		token: token.toString(),
	});
});


// Catch 404
router.use((req, res, next) => {
	res.status(404).send_err("Unknown endpoint");
});


// Catch errors
router.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send_err("Internal server error");
});
