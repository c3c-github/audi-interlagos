// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create a new Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up public path
app.use('/public/', express.static('./public'));

// Set up views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/menu'));
const PORT = process.env.PORT || 4001;
app.listen(PORT, console.log("Server has started at port " + PORT))
