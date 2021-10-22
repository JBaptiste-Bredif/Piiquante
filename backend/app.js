const express = require('express');
// const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const userRoutes = require('./routes/route-user')
const sauceRoutes = require('./routes/route-sauce')

const app = express();
const cors = require('cors')

app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
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


app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

module.exports = app;