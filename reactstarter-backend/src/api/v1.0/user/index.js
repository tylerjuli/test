const Router = require('koa-router')

const user = new Router()
const authCtrl = require('./user.ctrl')

user.get('/getUsers', authCtrl.getUsers)
user.post('/updateUser', authCtrl.updateUser)


module.exports = user