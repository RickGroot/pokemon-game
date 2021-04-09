const express = require('express')
const router = express.Router()
const { isUserLoggedIn } = require('../utils/users')
const { home, chat } = require('../renders/render')

router.get('/', home).post('/chat', chat).get('/chat', isUserLoggedIn)

module.exports = router
