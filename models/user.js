const passportLocalSequelize = require('passport-local-sequelize')


module.exports = (sequelize, DataTypes) => {
    const User = passportLocalSequelize.defineUser(sequelize, {
        timezone: DataTypes.STRING
    })
    return User;
} 