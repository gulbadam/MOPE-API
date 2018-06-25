const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');

const app = express();
app.use(bodyParser.json());
const PORT= 3001;

const database = {
    users: [{
        id: '123',
        name: 'Yelena',
        email: 'gulbadam@gulbadam.com',
        entries: 0,
        password: "123456",
        joined: new Date()
    }],
    secrets: {
        users_id: '123',
        hash: 'wghhh'
    }
}

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send(database.users));

app.post('/signin', (req, res) => {
    //var a = JSON.parse(req.body);
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.send('signed in');
    } else {
        res.json('access denied');
    }
})

app.post('/findface', (req, res) => {
    database.users.forEach(user => {
        if (user.email === req.body.email) {
            user.entries++
            res.json(user)
        }
    });
    res.json('nope')
})


app.post('/register', (req, res) => {
    database.users.push({
        id: '124',
        name: req.body.name,
        email: req.body.email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:userId', (req, res) => {
    database.users.forEach(user => {
        if (user.id === req.params.userId) {
            return res.json(user);
        }
    })
    // res.json('no user')

})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})