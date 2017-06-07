import AbstractError from './AbstractError'

/**
 * Mysql数据库操作错误类
 */
export default class MysqlError extends AbstractError {

  /**
   * Mysql数据库操作错误类构造函数
   * @param  {[Object]} err [
   * {
   * 		code: 'node-mysql定义的错误code',
   * 		fatal: '是否严重',
   * 		message: '错误信息',
   * 		stack: '错误堆栈上下文'
   * }]
   */
  constructor (err) {
    super(err)
    this.type = 'Mysql'
    this.detail = {
      code: err.code,
      fatal: err.fatal
    }
  }
}
