
const Sequelize = require('sequelize');
const token = require('lib/token')
const Op = Sequelize.Op;
const crypto = require('crypto')

const { PASSWORD_HASH_KEY: secret } = process.env

function hash(passowrd) {
    return crypto.createHmac('sha256', secret).update(passowrd).digest('hex')
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0 // 0: designer, 1:admin
        },
        social: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        status: {
            type: DataTypes.INTEGER, // 0: Disabled, 1: Active
            defaultValue: 0
        }
    });

    User.beforeCreate(async user => {
        user.password = hash(user.password);
    });

    User.beforeUpdate(async user => {
        if (user.password) {
            user.password = hash(user.password);
        }
    });

    User.findByEmail = async (email) => (
        await User.findOne({
            where: { email }
        })
    )

    User.constfindBydisplayName = async (username) => (
        await User.findOne({
            where: { username }
        })
    )
    User.findById = async (id) => (
        await User.findOne({
            where: { id }
        })
    )

    User.findExistancy = async({ email, username }) => (
        await User.findOne({
            where: {
              [Op.or]: [{ email}, { username}]
            }
        })
    )
    User.updateUser = async({ id, query }) => (
        await User.update(
            query,
            {returning: true, where: { id } }
          )
    )

    User.localRegister = async ({ username, email, password, status, role, firstname, lastname, address, company }) => (
        await User.create({ username, email, password, status, role, firstname, lastname, address, company})
    )

    User.validatePassword = (password, db_password) => {
            const hashed = hash(password)            
            return db_password === hashed
    }

    User.generateToken = function(user) {
        const { id, username } = user
        return token.generateToken({
            user: {
                id,
                username
            }
        }, 'user')
    }
    return User;
};