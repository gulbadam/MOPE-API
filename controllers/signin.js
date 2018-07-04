const jwt = require('jsonwebtoken');

// Redis Setup
const redisClient = require('redis').createClient(process.env.Redis_URL);
// const hostRedis = "ec2-54-236-162-33.compute-1.amazonaws.com" || '127.0.0.1'
// // update  host to the proper address in production
// const redisClient = redis.createClient({
//     host: hostRedis,
//     user: 'h',
//     port: 30429,
//     password: 'p851c4c9dc85c5303f97e90714f831dc0b0906072b8d0322f9cd8c412aaf8b761'
// });

const signToken = (username) => {
    const jwtPayload = {
        username
    };
    return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', {
        expiresIn: '2 days'
    });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
    const {
        email,
        id
    } = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => {
            return {
                success: 'true',
                userId: id,
                token,
                user
            }
        })
        .catch(console.log);
};

const handleSignin = (db, bcrypt, req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                return Promise.reject('wrong credentials');
            }
        })
        .catch(err => err)
}

const getAuthTokenId = (req, res) => {
    const {
        authorization
    } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).send('Unauthorized');
        }
        return res.json({
            id: reply
        })
    });
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const {
        authorization
    } = req.headers;
    return authorization ? getAuthTokenId(req, res) :
        handleSignin(db, bcrypt, req, res)
        .then(data =>
            data.id && data.email ? createSession(data) : Promise.reject(data))
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    signinAuthentication: signinAuthentication,
    redisClient: redisClient
}


// const handleSignin = (req, res, db, bcrypt) => {
//     const {email, password} =req.body;
//     if (!email || !password) {
//         return res.status(400).json('incorrect form submission')
//     }
// db.select('email', 'hash').from('login')
//     .where('email', '=', email)
//     .then(data => {
//         const isValid = bcrypt.compareSync(password, data[0].hash);
//         console.log(isValid)
//         if (isValid) {
//             return db.select('*').from('users')
//                 .where('email', '=', email)
//                 .then(user => {
//                     res.json(user[0])
//                 })
//                 .catch(err => res.status(400).json('unable to get user'))
//         } else {
//             res.status(400).json("wrong credentials")
//         }
//     })
//     .catch(err => res.status(400).json('wrong credentials'))
// };
// module.exports = {
//     handleSignin: handleSignin
// }
