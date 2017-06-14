import jwt from 'jsonwebtoken'
import moment from 'moment'


const createToken = (userId, userAgent, days) => {
  return jwt.sign({
    userId,
    userAgent,
    days,
    renewTime: moment().add(1, 'h').unix()
  }, SECRETKEY, {
    expiresIn: `${days}d`
  })
}

export {
  createToken
}