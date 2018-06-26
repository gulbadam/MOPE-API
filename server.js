const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex =require ('knex');
const app = express();
const register =require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
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
// db.select('*').from('users').then(data => {
//     console.log(data);
// })

// const database = {
//     users: [{
//         id: '123',
//         name: 'Yelena',
//         email: 'gulbadam@gulbadam.com',
//         entries: 0,
//         password: "123456",
//         joined: new Date()
//     }],
//     secrets: {
//         users_id: '123',
//         hash: 'wghhh'
//     }
// }

app.use(cors());
app.use(bodyParser.json());
//app.get('/', (req, res) => res.send(database.users));

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.put('/image', (res, req) => {image.handleImage(req, res, db)})


app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});