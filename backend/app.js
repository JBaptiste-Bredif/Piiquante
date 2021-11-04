const express = require('express');
// const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const userRoutes = require('./routes/route-user')
const sauceRoutes = require('./routes/route-sauce')
const path = require('path')
const app = express();
const cors = require('cors')

app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//     res.setHeader('Content-Type', 'application/json');
//     next()
// })

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

mongoose.connect('mongodb+srv://User_test:User_test@clustertest.s7kds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

module.exports = app;

// const express = require('express')
// // const helmet = require('helmet')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// // const path = require('path')

// // require('dotenv').config({ path: process.cwd() + '/.env' });

// const sauceRoutes = require('./routes/route-sauce')
// const userRoutes = require('./routes/route-user')

// const app = express()
// // app.use(helmet())

// mongoose.connect('mongodb+srv://User_test:User_test@clustertest.s7kds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//     next()
// })

// app.use(bodyParser.json())

// // app.use('/images', express.static(path.join(__dirname, 'images')))

// app.use('/api/sauces', sauceRoutes)
// app.use('/api/auth', userRoutes)

// module.exports = app