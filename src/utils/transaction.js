import db from '../models'
import MysqlError from './error/MysqlError'

/**
 * 进行数据库事务操作
 * @param  {Function} operation 一系列数据库事务操作
 * @return {Promise}
 */

/** use 

 async function (t) => {
   let user = awaitUser.create({name: 'zzz'}, {transaction: t})
   user = await user.setShooter({name: 'yyyyyy'}, {transaction: t})
 }
 */
export const transaction = async (operation) => {
  // 开始事务
  let t
  try {
    t = await db.sequelize.transaction()
    // 进行事务操作
    const result = await operation(t)
    t.commit()
    return Promise.resolve(result)
  } catch (err) {
    t.rollback()
    return Promise.reject(new MysqlError(err))
  }
}


// return sequelize.transaction().then(function (t) {
//   return User.create({
//     firstName: 'Homer',
//     lastName: 'Simpson'
//   }, {transaction: t}).then(function (user) {
//     return user.addSibling({
//       firstName: 'Lisa',
//       lastName: 'Simpson'
//     }, {transaction: t});
//   }).then(function () {
//     return t.commit();
//   }).catch(function (err) {
//     return t.rollback();
//   });
// });


