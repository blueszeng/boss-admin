// import bcrypt from 'bcrypt'
// import config from '../configs/config'
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    money: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    commission: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    }
  }, {
    underscored: true,
    tableName: 'users',
    indexes: [{unique: true, fields: ['id']}],
    classMethods: {
    },
    instanceMethods: {
      // authenticate: function (value) {
      //   if (bcrypt.compareSync(value + config.salt, this.password)) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    }
  })
  return User
}
