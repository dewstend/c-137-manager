const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const app = express();

const corsOptions = {
  origin: '*://localhost:*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Database connection

// Routes
const Locations = require('./routes/Locations');
// const Episodes = require('./routes/Episodes');
// const Characters = require('./routes/Characters');

app.use('/locations', Locations);
// app.use('/episodes', Episodes);
// app.use('/characters', Characters);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});