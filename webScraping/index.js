const express = require('express');
const cors = require('cors');
const mysql = require('mysql'); 
const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');

const model = require('./model')

const DB = require('./db');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'pug');

DB.connection.authenticate().then(() => console.log('Database connected')).catch(err => console.log('Error: ' + err));

app.get('/', (req, res) => {

    model.firstTable.findAll()
    .then(bla => {
    
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
});

app.get('/film', (req, res) => {

    model.firstTable.findAll({ where: { categories: 'film' } })
    .then(content => {
    
        const el = [];

        content.forEach(element => {
       
        });

        res.render('films', { title: 'films', content: content });
    })
    .catch(err => console.log(err))
});

app.get('/music', (req, res) => {

    model.firstTable.findAll({ where: { categories: 'muzika' } })
    .then(content => {

        const el = [];

        content.forEach(element => {
 
        });

        res.render('music', { title: 'music', content: content });
    })
    .catch(err => console.log(err))
});

app.get('/books', (req, res) => {

    model.firstTable.findAll({ where: { categories: 'knigi' } })
    .then(content => {
        
        const el = [];

        content.forEach(element => {
 
        });

        res.render('books', { title: 'books', content: content });
    })
    .catch(err => console.log(err))
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
