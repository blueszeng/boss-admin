import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { env } from '../configs/config'
import database from '../configs/database'
import _debug from 'debug'

const log = _debug('backend:models:index')
const config = database[env]
const basename = path.basename(module.filename)
const db = {}
let sequelize = null
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname).forEach((file) => {
  if (!/\.js$/.test(file) || file === basename) {
    return;
  }
  var model = sequelize['import'](path.join(__dirname, file))
  db[model.name] = model
})
async function initCreateDb(sequelize) {
  try {
    await sequelize.sync({ force: false })
    log('init createDb successed' )
  } catch (err) {
     log(`init createDb failed to error: ${err}`)
  }
}
initCreateDb(sequelize)
db.sequelize = sequelize
export default db
