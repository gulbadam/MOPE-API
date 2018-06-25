const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex =require ('knex')
const app = express();
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
app.get('/', (req, res) => res.send(database.users));

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data  => { const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log(isValid)
        if(isValid) {
           return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err =>res.status(400).json('unable to get user'))
        } else{
        res.status(400).json("wrong credentials")
    }
    })
  .catch(err => res.status(400).json('wrong credentials'))
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment(
        'entries', 1)
        .returning("entries")
        .then(entries =>{
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
    })


    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found =true;
    //         user.entries++
    //         console.log(user.entries);
    //         return res.json(user.entries)
    //     }
    // })
    // if(!found) {
    // res.status(400).json('not found')}
// })


app.post('/register', (req, res) => {
    const {email, name, password} =req.body;
    const hash =bcrypt.hashSync(password);
    db.transaction(trx =>{
      trx.insert({
          hash: hash,
          email: email
      }) 
      .into("login")
    .returning('email')
    .then(loginEmail =>{
return trx('users')
    .returning("*")
    .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })
    })
    .then(trx.commit)
    .catch(trx.rollback)
    })
   .catch(err => res.status(400).json("unable to register"))
    
})

app.get('/profile/:id', (req, res) => {
    const {id} =req.params;
    let found =false;
    db.select('*').from('users').where({id}).then(user => {
        if(user.length) {
        res.json(user[0])
    } else {
        res.status(400).json("not found")
    }
    })
    .catch(err => res.status(400).json("error getting user"))
  
    // if (!found) {
    //     res.status(400).json('not found')
    // }

})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})