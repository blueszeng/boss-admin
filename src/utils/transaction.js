import db from '../models'
import MysqlError from './error/MysqlError'

/**
 * 进行数据库事务操作
 * @param  {Function} operation 一系列数据库事务操作
 * @return {Promise}
 */
export const transaction = async (operation) => {
  // 开始事务
  let t
  try {
    t = await db.sequelize.transaction()
    // 进行事务操作
    const result = await operation(t)
    t.commit()
  } catch (err) {
    t.rollback()
    return Promise.reject(new MysqlError(err))
  }
}
