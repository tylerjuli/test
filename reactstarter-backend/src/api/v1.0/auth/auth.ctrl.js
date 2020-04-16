const Joi = require('joi')
const db = require('db')

exports.localRegister = async (ctx) => {

    const { body } = ctx.request

    const schema = Joi.object({
        username: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30),
        firstname: Joi.string().regex(/^[a-zA-Z]/).required(),
        lastname: Joi.string().regex(/^[a-zA-Z]/).required(),
        company: Joi.string().required(),
        address: Joi.string().required()
    })

    const result = Joi.validate(body, schema)

    if (result.error) {
        ctx.status = 400
        ctx.body = {
            message: result.error.details[0].message
        }
        return
    }

    const { username, email, password, firstname, lastname, address, company } = body

    try {
        const exists = await db.User.findExistancy({
            username,
            email
        })

        allUsers = await db.User.findAll()
        const temp = allUsers.length == 0? 2 : 0;
        const status = temp;
        const role = temp

        if (exists) {
            ctx.status = 409
            const message = exists.email === email ? 'E-mail Already in Use.' : 'Username Already in Use.'
            ctx.body = {
                message
            }
            return
        }
        const user = await db.User.localRegister({
            username,
            email,
            password,
            status,
            role,
            firstname,
            lastname,
            address,
            company
        })
        const accessToken = await db.User.generateToken()

        ctx.body = {
            username,
            id: user.id,
            access_token: accessToken
        }
        // configure accessToken to httpOnly cookie
        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 24 * 7
        })
    } catch (e) {
        ctx.throw(500)
    }
}

exports.localLogin = async (ctx) => {
    const { body } = ctx.request
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30)
    })

    const result = Joi.validate(body, schema)
    if (result.error) {
        ctx.status = 400
        ctx.body = {
            message: 'The E-mail address or password is incorrect'
        }
        return
    }

    const { email, password } = body
    try {
        // find user
        const user = await db.User.findByEmail(email)
        if (!user) {
            // User does not exist
            ctx.status = 400
            ctx.body = {
                message: 'The E-mail address or password is incorrect'
            }
            return
        }

        const validated = db.User.validatePassword(password, user.password)
        if (!validated) {
            // wrong password
            ctx.status = 403
            ctx.body = {
                message: 'The E-mail address or password is incorrect'
            }
            return
        }
        const { username, id, metaInfo, status, role } = user

        if (!status) {
            // wrong password
            ctx.status = 403
            ctx.body = {
                message: 'Your account is not approved yet'
            }
            return
        }

        const accessToken = await db.User.generateToken()

        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 24 * 7
        })

        ctx.body = {
            username,
            id,
            metaInfo,
            role,
            access_token: accessToken
        }
    } catch (e) {
        ctx.throw(e)
    }
}

exports.check = async (ctx) => {
    const { body } = ctx.request;
    console.log(body)
    if(!body) {
      ctx.status = 401;
      return;
    }
    let exists = null
    try {
       exists = await db.User.findById(body.id);
      if(!exists) {
        // invalid user
        ctx.cookies.set('access_token', null, {
          maxAge: 0,
          httpOnly: true
        });
        ctx.status = 401;
        return;
      }
    } catch (e) {
      ctx.throw(500, e);
    }
    user = {
        id: exists.id,
        username: exists.name
    }
    ctx.body = {
      body
    };
  };
  
  exports.logout = (ctx) => {
    ctx.cookies.set('access_token', null, {
      maxAge: 0,
      httpOnly: true
    });
    ctx.status = 204;
  };