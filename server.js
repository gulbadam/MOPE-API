const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT= 3000;
 const database = {
     users: [
         {
         id: "1",
         name: "yelena",
         email: "gulbadam@gulbadam.com",
         password: "123456",
         entries: 0,
         joined: new Date()
         },
         {
             id: "2",
             name: "Amin",
             email: "amin@guliyev.net",
             password: "0248",
             entries: 0,
             joined: new Date()
         }

     ]
 }
app.get('/', (req, res)=> {
    res.send('WORKING')
});
app.post('/signin',(req, res)=>{
    //res.json('SIGNIN')
    if(req.body.email=== database.users[0].email &&  req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(404).json('error logging in')
    }
});
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})