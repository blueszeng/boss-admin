var database = {
  development: {
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
  },
  production: {
    username: process.env.DATABASE_USERNAME_PRO || 'root',
    password: process.env.DATABASE_PASSWORD_PRO || '_123456',
    database: process.env.DATABASE_NAME_PRO || 'test',
    host: process.env.DATABASE_HOST_PRO || '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 1000
    }
  }
}

module.exports = database
