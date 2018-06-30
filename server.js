const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex =require ('knex');
const Clarifai = require ("clarifai");
const app = express();
const register =require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const PORT= 3001;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'gulbadam',
        password: '',
        database: 'mopedb'
    }
});

app.use(cors());

//app.get('/', (req, res) => res.send(database.users));

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.put('/image', (req, res) => {
    console.log("body" + req.body); image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})
app.post('/colors', (req, res) => {
    image.handleApiColors(req, res)
})
app.post('/demographics', (req, res) => {
    image.handleApiDemographics(req, res)
})
app.post('/general', (req, res) => {
    image.handleApiGeneral(req, res)
})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});