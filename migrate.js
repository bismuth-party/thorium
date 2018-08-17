/*
	This file converts old databases with the userid format to the new users format
	Please note that old users are lost, since not enough data is available for the required
	Users object. However, all historical records and tokens are kept.
*/


const fs = require('fs');

let db = JSON.parse(fs.readFileSync('build/db.json').toString());

Object.keys(db).forEach(key => {
	// Add missing `users` object
	if (key.startsWith('chat/') && db[key].users == undefined) {
		db[key].users = {};
	}

	// Replace `photos` with `photo`
	if (key.startsWith('chat/')) {
		db[key].history.forEach((hist) => {
			if (hist.content && hist.content.photos) {
				let photos = hist.content.photos;

				let max_fs = 0;
				let max_ph;

				for (let x of photos) {
					if (x.file_size > max_fs) {
						max_ph = x;
						max_fs = x.file_size;
					}
				}

				delete hist.content.photos;
				hist.content.photo = max_ph;
			}
		});
	}
});

fs.writeFileSync('build/db.json', JSON.stringify(db, null, '\t'));
