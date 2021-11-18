const express = require('express')
const helmet = require("helmet")
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

require('dotenv').config({ path: process.cwd() + '/.env' })

const app = express()

const userRoutes = require('./routes/route-user')
const sauceRoutes = require('./routes/route-sauce')

app.use(helmet()) // XSS Protection
app.use(cors()) // Headers Access-Control-Allow-Origin settings

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use( // Injection protection
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`)
    },
  }),
)

mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

module.exports = app