const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex =require ('knex');
const morgan =require ('morgan');


const register =require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');


//const PORT = process.env.PORT || 3001 ;

const db = knex({
    client: 'pg',
    //connection: {
        //host: process.env.POSTGRES_HOST,
        //user: process.env.POSTGRES_USER,
        //password: process.env.POSTGRES_PASSWORD,
        //database: process.env.POSTGRES_DB,
        connection: process.env.POSTGRES_URI
        // connectionString: process.env.DATABASE_URL,
         //ssl: true
   // }
});
const app = express();
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(morgan('combined', {
            skip: function (req, res) {
                return res.statusCode < 400
            }
        }));
app.use (cors (corsOptions));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//app.get('/', (req, res) => res.send(database.users));
app.get('/', (req, res) => res.send("working"));

//app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/signin', signin.signinAuthentication(db, bcrypt));
//app.post('/signin', (req, res) => {signin.handleSignin(db, bcrypt)})
app.put('/image', (req, res) => {console.log("body" + req.body); image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
app.post('/colors',  (req, res) => {image.handleApiColors(req, res)})
app.post('/demographics',  (req, res) => {image.handleApiDemographics(req, res)})
app.post('/general',  (req, res) => {image.handleApiGeneral(req, res)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',  auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileUpdate(req, res, db)})
//app.listen(PORT, () => {console.log(`app is running on port ${PORT}`);

//});
app.listen(process.env.PORT || 3001, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});