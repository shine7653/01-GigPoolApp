const mysql = require('mysql');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
  
// Database ---> after this, create a model Gig.js
const db = require('./config/database');

// test DB
db
    .authenticate()
    .then(() => {
        console.log('Database connected.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser, We're getting data from a form
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
// app.get('/', (req, res) => res.send('INDEX'));
app.get('/', (req, res) => res.render('index', { layout: 'landing'}));

// Gig routes
app.use('/gigs', require('./routes/gigs'));



const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

