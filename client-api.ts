import * as express from 'express';

import * as types from './types';

import './express-extension';


export const router = express.Router();


// Check if connection works
router.all('/ping', (req, res) => {
	res.send_ok();
});


const auth_chat_router = express.Router({
	// Copy token and chatid from `router`
	mergeParams: true,
});

router.use('/:token/chat/:chatid', auth_chat_router);
auth_chat_router.use((req, res, next) => {
	let chatid = parseInt(req.params.chatid);
	let token = types.Token.fromString(req.params.token);

	if (req.database.validateToken(chatid, token)) {
		next();
	}
	else {
		res.send_err("Invalid token");
	}
})


// Get general information about a chat
auth_chat_router.get('/', (req, res) => {
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


	res.send_ok(data);
});


// Get extended information about a chat
auth_chat_router.get('/extended', (req, res) => {
	const chatid = parseInt(req.params.chatid);

	// Check if chat exists
	if (! req.database.chatExists(chatid)) {
		res.send_err("Unknown chat");
		return;
	}

	// Get chat
	let chat = req.database.getChat(chatid);
	let data = <any> { };

	// Get 20 most recent messages
	// NOTE: The history is descending, so the first item is the latest record
	let messages = chat.history
		.filter((hist) => hist.type === types.HistoryType.Message)
		.slice(0, 20);


	data.recent_messages = messages;


	// Get all titles
	let titles = chat.history
		.filter((hist) => hist.type === types.HistoryType.ChatUpdate_NewTitle);

	data.all_titles = titles;;


	// Get all userids
	let userids = chat.userids;
	data.userids = userids;


	res.send_ok(data);
});


// Get a list of all known titles
auth_chat_router.get('/titles', (req, res) => {
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
