// Packages
const path = require('path')
const http = require('http')
const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const { initSocketIO } = require('./utils/socket')
const app = express()
const server = http.createServer(app)
const router = require('./routes/router')

// App variables
const port = process.env.PORT || 3000
const templates = path.join(__dirname, './views')
const newSession = session({
  secret: 'stonk-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: 'auto',
  },
})

// Set static folder
app
  .set('view engine', 'hbs')
  .set('views', __dirname + '/views')
  .engine(
    'hbs',
    handlebars({
      extname: 'hbs',
      defaultLayout: 'main',
    })
  )
  .use(express.static(path.join(__dirname, './../public')))
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(express.json())
  .use(newSession)
  .use(router)

initSocketIO(server, newSession)

server.listen(port, () => {
  console.log(`Stonks running on http://localhost:${port}`)
})
