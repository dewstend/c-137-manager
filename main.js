const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const Auth = require('./models/').Auth;

const app = express();

const corsOptions = {
  origin: '*://localhost:*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

(async () => {
    try {
        await Auth.findOne().then(res => {
        	process.env.API_KEY = res.API_Key;
        })
    } catch (e) {
        console.log(`Failed to obtain API Key`, e);
    }
})();

// API Key
app.all('/api/*', function(req, res, next) {
	if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No API key was provided' });
  } else if(req.headers.authorization !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  next();
});

// Database connection

// Routes
const Locations = require('./routes/Locations');
const Characters = require('./routes/Characters');
// const Episodes = require('./routes/Episodes');

app.use('/api/locations', Locations);
app.use('/api/characters', Characters);
// app.use('/episodes', Episodes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});