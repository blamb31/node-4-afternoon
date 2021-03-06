const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config()

const authCtrl = require('./controllers/authController')
const cartCrtl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')


const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')

const {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())

app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.listen(SERVER_PORT, () => console.log(`I'm listening on port: ${SERVER_PORT}`))

app.get('/api/swag', swagCtrl.read)
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/checkout', cartCrtl.checkout)
app.post('/api/cart/:id', cartCrtl.add)
app.delete('/api/cart/:id', cartCrtl.delete)

app.get('/api/search', searchCtrl.search)
