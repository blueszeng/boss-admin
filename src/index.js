import Sequelize from 'sequelize'
let mysql = {
  username: process.env.DATABASE_USERNAME_DEV || 'root',
  password: process.env.DATABASE_PASSWORD_DEV || '123456',
  database: process.env.DATABASE_NAME_DEV || 'test',
  host: process.env.DATABASE_HOST_DEV || '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 1000
  }
}

let sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, mysql)

var User = sequelize.define('User', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'users',
  classMethods: {
    method1: function () { return 'smth' }
  },
  getterMethods: {
    fullName: function () { return this.firstName + ' ' + this.lastName }
  },
  instanceMethods: {
    method2: function () { return 'foo' },
    getFullname: function () {
      return [this.firstName, this.lastName].join(' ')
    }
  }
  // freezeTableName: false // Model tableName will be the same as the model name
})
// freezeTableName 是否定义模板名称即为表名，ture是 false 模型名后加s
// force 是否强制创建表 ture, false
User.sync({force: false}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  })
})

let v = User.build({
  firstName: 'foo',
  lastName: 'bar'
}).getFullname()
console.log(v)
console.log(User.build({
  firstName: 'foo',
  lastName: 'bar'
}).fullName)
