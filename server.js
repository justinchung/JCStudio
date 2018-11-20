// Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const audioapi = require('./routes/api/audio.js')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Allow use of static files
app.use(express.static('static'));

// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log("Conncted to", db))
	.catch(err => console.log(err));

// Use Routes
app.use('/api/audio', audioapi);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));