const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex =require ('knex')
const app = express();
app.use(bodyParser.json());
const PORT= 3001;

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'gulbadam',
        password: '',
        database: 'mopedb'
    }
});
console.log(postgres.select('*').from('users'));

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
app.get('/', (req, res) => res.send(database.users));

app.post('/signin', (req, res) => {
    
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
        
    } else {
        res.status(400).json("error login");
        console.log("not")
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found =true;
            user.entries++
            console.log(user.entries);
            return res.json(user.entries)
        }
    })
    if(!found) {
    res.status(400).json('not found')}
})


app.post('/register', (req, res) => {
    const {email, name, password} =req.body;
    database.users.push({
        id: '124',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const {id} =req.params;
    let found =false;
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }

})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})