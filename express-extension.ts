declare global {
	namespace Express {
		interface Response {
			send_ok(_?:object): void;
			send_err(_:string): void;
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

	next();
}
