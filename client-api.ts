import * as express from 'express';

import * as types from './types';

import './express-extension';


export const router = express.Router();


// Check if connection works
router.all('/ping', (req, res) => {
	res.send_ok();
});


// Get general information about a chat
router.get('/chat/:chatid', (req, res) => {
	const chatid = parseInt(req.params.chatid);

	// Check if chat exists
	if (! req.database.chatExists(chatid)) {
		res.send_err("Unknown chat");
		return;
	}

	// Get chat
	let chat = req.database.getChat(chatid);
	let data = <any> { };

	// Get last message
	// NOTE: The history is descending, so the first item is the latest record
	let message = chat.history
		.find((hist) => hist.type === types.HistoryType.Message);

	if (typeof message !== 'undefined') {
		data.last_message = message;
	}


	// Get last title
	let title = chat.history
		.find((hist) => hist.type === types.HistoryType.ChatUpdate_NewTitle);

	if (typeof title !== 'undefined') {
		data.last_title = title.content;
	}


	// Get all users
	let users = chat.history
		.filter((hist) => hist.type === types.HistoryType.ChatUpdate_NewMember)
		.map((hist) => hist.content);

	data.users = users;


	res.send_ok(data);
});


// Get a list of all known titles
router.get('/chat/:chatid/titles', (req, res) => {
	const chatid = parseInt(req.params.chatid);

	// Check if chat exists
	if (! req.database.chatExists(chatid)) {
		res.send_err("Unknown chat");
		return;
	}

	// Get chat
	let chat = req.database.getChat(chatid);
	let data = <any> { };

	// Get all titles
	let titles = chat.history
		.filter((hist) => hist.type === types.HistoryType.ChatUpdate_NewTitle);

	data.titles = titles;


	res.send_ok(data);
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
