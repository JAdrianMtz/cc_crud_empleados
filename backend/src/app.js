const express = require('express');
const cors = require('cors');

const app = express();

// config
app.set('port', process.env.PORT || 5000);

// middlewares 
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/employees', require('./routes/employees.routes'));

module.exports = app;