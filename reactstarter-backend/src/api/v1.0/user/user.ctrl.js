const Joi = require('joi')
const db = require('db')
const { sendApproveEmail } = require('lib/sendMail');

exports.getUsers = async (ctx) => {

    const { user } = ctx.request;
      
    try {
        users = await db.User.findAll()
        ctx.body = users;

    } catch (e) {
        console.log(e)
        ctx.throw(500)
    }
}

exports.updateUser = async (ctx) => {

    const { body } = ctx.request;
    const { id, query } = body;

    try {
        if ( !!query.status ){
            const user = await db.User.findById(id);
            console.log(user)
            const { firstname, lastname, email } = user.dataValues;
            let mail = await sendApproveEmail(firstname, lastname, email);
        }
        let ret = await db.User.updateUser({ id, query })
        console.log(ret)
        ctx.body = ret;

    } catch (e) {
        console.log(e)
        ctx.throw(500)
    }
}
