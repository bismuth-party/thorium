/*
	This file converts old databases with the userid format to the new users format
	Please note that old users are lost, since not enough data is available for the required
	Users object. However, all historical records and tokens are kept.
*/


const fs = require('fs');

let db = JSON.parse(fs.readFileSync('build/db.json').toString());

Object.keys(db).forEach(key => {
	if (key.startsWith('chat/') && db[key].users == undefined) {
		db[key].users = {};
	}
});

fs.writeFileSync('build/db.json', JSON.stringify(db, null, '\t'));
