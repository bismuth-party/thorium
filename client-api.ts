import * as express from 'express';

import * as types from './types';
import { staticMemoryDatabase as database } from './memory-database';

import './express-extension';


export const router = express.Router();


// Check if connection works
router.all('/ping', (req, res) => {
	res.send_ok();
});


// Get general information about a chat
router.get('/chat/:chatid', (req, res) => {
	try {
		const chatid = parseInt(req.params.chatid);

		// Check if chat exists
		if (! database.chatExists(chatid)) {
			res.send_err("Unknown chat");
			return;
		}

		// Get chat
		let chat = database.getChat(chatid);
		let data = { };

		// Get last message
		// NOTE: The history is descending, so the first item is the latest message
		let message = chat.history.find((hist) => hist.type === types.HistoryType.Message);

		// Get last message (if any)
		if (typeof message !== 'undefined') {
			data['last_message'] = message;
		}


		res.send_ok(data);
	}
	catch(err) {
		console.error(err);
		res.send_err(err);
	}
});
