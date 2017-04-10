import Joi from 'joi'
import language from './language'

/**
 * 异步处理控制器入参校验
 * @param  {[Object]} values [待校验的数据对象]
 * @param  {[Object]} schema [执行校验的策略]
 * @return {[Promise]} [是否校验成功]
 */
const validate = async (values, schema) => {
  const validResult = Joi.validate(values, schema, { language })
  const error = validResult.error
  if (!error) {
    return Promise.resolve(validResult.value)
  }
  const allErrors = error.details
  if (allErrors.length > 0) {
    const curError = allErrors[0]
    return Promise.reject(curError)
  } else {
    return Promise.resolve()
  }
}

export { validate, Joi }
