import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as cson from 'cson';
import * as body_parser from 'body-parser';
import * as compression from 'compression';
import * as moment from 'moment-timezone';

import express_extension from './express-extension';


// Make sure config file exists
if (! fs.existsSync('./config.cson')) {
	console.error("Please copy the config.cson.example file to config.cson and add the bot token.");
	process.exit(1);
}

// Read config file
let config = cson.parse(fs.readFileSync('./config.cson').toString());

if (typeof config.bot_token === 'undefined') {
	console.error("Please specify the bot token in the config file");
	process.exit(1);
}

// Apply defaults
config.port = config.port || 8467;


// Initialise server
let app = express();

// Disable the `X-Powered-By: Express` header
app.disable('x-powered-by');


// Compress traffic for lower bandwidth
app.use(compression());

// Parse the POST body
app.use(body_parser.json());
app.use(body_parser.urlencoded({
	extended: true,
}));

// Add send_ok and send_err functions
app.use(express_extension);

// CORS *
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	if (req.method === 'OPTIONS') {
		res.sendStatus(200).end();
	}
	else {
		next();
	}
});


// Add logging
app.use((req, res, next) => {
	let date = moment().format('YYYYMMDDHHmmss');
	let ip = req.headers['X-Real-IP'] || req.headers['X-Forwarded-For'] || req.ip;
	let body = Object.getOwnPropertyNames(req.body).length ? JSON.stringify(req.body) : "";

	console.log(date + ` ${ip} ${req.method} ${req.path} ${body}`);

	next();
});


// Set up routes
app.get('/', (req, res) => {
	res.send('Hello, World!');
	res.end();
});


app.get('/admin', (req, res) => {
	res.sendFile(path.resolve('./admin.html'));
});



// Add bot API router
import { router as bot_api_router } from './bot-api';
app.use('/' + config.bot_token, bot_api_router);

// Add client API router
import { router as client_api_router } from './client-api';
app.use('/api', client_api_router);


// Start server
app.listen(config.port, () => {
	console.log(`Server started on port ${config.port}`);
});
