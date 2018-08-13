import * as express from 'express';
import * as fs from 'fs';
import * as cson from 'cson';
import * as body_parser from 'body-parser';
import * as compression from 'compression';

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


// Set up routes
app.get('/', (req, res) => {
	res.send('Hello, World!');
	res.end();
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
