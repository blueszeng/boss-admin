import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { env } from '../configs/config'
import database from '../configs/database.js'

const config = database[env]
const basename = path.basename(module.filename)
const db = {}
let sequelize = null
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
.readdirSync(__dirname)
.filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
})
.forEach((file) => {
  var model = sequelize['import'](path.join(__dirname, file))
  db[model.name] = model
})

db.sequelize = sequelize
export default db
