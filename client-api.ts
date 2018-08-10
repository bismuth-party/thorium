import * as express from 'express';

import * as types from './types';
import database from './database';

let router = express.Router();


// Check if connection works
router.all('/ping', (req, res) => {
	res.send({ ok: true });
	res.end();
});


// Get general information about a chat
router.get('/chat/:chatid', (req, res) => {
	const chatid = parseInt(req.params.chatid);

	// Check if chat exists
	if (! database.chatExists(chatid)) {
		res.send({
			ok: false,
			err: "Unknown chat",
		});

		res.end();
		return;
	}

	// Get chat
	let chat: types.Chat = database.getChat(chatid);
	let data = { ok: true };

	// Get all messages
	let messages = chat.history.filter((hist) => hist.type === types.HistoryType.Message);

	// Get last message (if any)
	if (messages.length > 0) {
		data['last_message'] = messages[messages.length - 1];
	}


	res.send(data);
	res.end();
});


export {
	router
}
