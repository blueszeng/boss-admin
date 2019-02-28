import bcrypt from 'bcrypt'
import config from '../configs/config'
export default (sequelize, DataTypes) => {
    const User = sequelize.define('AdminUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true,
        tableName: 'users',
        indexes: [{ unique: true, fields: ['email'] }],
        classMethods: {},
        instanceMethods: {
            authenticate: function(value) {
                if (bcrypt.compareSync(value + config.salt, this.password)) {
                    return true
                } else {
                    return false
                }
            }
        }
    })
    return User
}