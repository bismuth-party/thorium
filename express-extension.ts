import { Database } from './database';
import { JSONDatabase } from './json-database';


const database = new JSONDatabase('./build/db.json');


declare global {
	namespace Express {
		interface Response {
			send_ok(_?:object): void;
			send_err(_:string): void;
		}

		interface Request {
			database: Database;
		}
	}
}

export default function(req, res, next) {
	res.send_ok = function(data: object = {}) {
		data['ok'] = true;
		res.send(data);
		res.end();
	};

	res.send_err = function(err: string) {
		res.send({
			ok: false,
			err,
		});
		res.end();
	};

	req.database = database;

	next();
}
