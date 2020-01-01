const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../model/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
// router.get('/', (req, res) => res.send('GIGS'));
router.get('/', (req, res) =>
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            // res.sendStatus(200);
            // render( view, data )
            res.render('gigss', { gigs });
        })
        .catch(err => console.log(err))
);

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
    // const data = {
    //     title: 'Looking for a full stack',
    //     technologies: 'flex, c++',
    //     budget: '6000',
    //     description: 'jgumhkihlytr76hb6ye4rw3',
    //     contact_email: 'user2@gmail.com'
    // }
    // ?????????? const data up there, why again?
    // let { title, technologies, budget, description, contact_email } = data;
    // This variables are exactly matched in add.handlebars as fields
    let { title, technologies, budget, description, contact_email } = req.body;

    let errors = [];

    // Validate Fields
    if (!title) {
        errors.push({ text: 'Add a title' });
    }
    if (!technologies) {
        errors.push({ text: 'Add a technologies' });
    }
    if (!description) {
        errors.push({ text: 'Add a description' });
    }
    if (!contact_email) {
        errors.push({ text: 'Add a contact_email' });
    }

    // Check for errors
    // If there's error render those in add.handlebars
    // We send this back to the form
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    } else {
        // if (!budget) {
        //     budget = 'Unknown';
        // } else {
        //     budget = `$${budget}`;
        // }

        // // Make lowercase and remove space after comma
        // technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
            .then(gigs => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
});

// Search for gigs
router.get('/search', (req, res) => {
    // req.query.term
    const{ term } = req.query;

    // '%' anything
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } }})
    .then(gigs => res.render('gigss', { gigs }))
    .catch(err => console.log(err));
});



module.exports = router;

