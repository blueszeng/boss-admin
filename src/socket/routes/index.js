
import fs from 'fs'
import path from 'path'

const basename = path.basename(module.filename)
module.exports = (io) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (!/\.js$/.test(file) || file === basename) {
      return
    }
    let route = require(path.join(__dirname, file))

    for (let key in route) {
      io.route(key, route[key])
    }
  })
}
