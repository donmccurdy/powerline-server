var dotenv = require('dotenv'),
	oauthshim = require('oauth-shim'),
	express = require('express');

dotenv.load();

var PORT = process.env.PORT,
	NODE_ENV = process.env.NODE_ENV,
	CLIENT_ID = process.env.CLIENT_ID,
	CLIENT_SECRET = process.env.CLIENT_SECRET;

var app = express();
app.all('/oauthproxy', oauthshim.request);

var config = {};
config[CLIENT_ID] = CLIENT_SECRET;
oauthshim.init(config);

if (NODE_ENV === 'development') {
	oauthshim.debug = true;
}

app.listen(PORT);
console.log('Listening on port %d...', PORT);
