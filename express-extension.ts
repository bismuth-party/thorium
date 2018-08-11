import * as express from 'express';


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
