import {payment} from '../../stores/wechat_pay'


export const closeOrderParams = async (orderNo) => {
  return new Promise((resolve, reject) => {
    payment.closeOrder({ out_trade_no: orderNo }, (err, data) => {
      if (err) {
        debug(err)
        resolve({ err })
      }
      resolve(data)
    })
  })
}

export const queryOrderStateParams = async (orderNo) => {
  return new Promise((resolve, reject) => {
    payment.orderQuery({ out_trade_no: orderNo }, (err, data) => {
      if (err) {
        debug(err)
        resolve({ err })
      }
      resolve(data)
    })
  })
}

export const getPayargsParams = async ({orderNo, money, openid, requestIp}) => {
  const order = {
    body: '金额充值',
    out_trade_no: orderNo,
    total_fee: money,
    spbill_create_ip: requestIp.slice(7),
    openid: openid,
    trade_type: 'JSAPI'
  }

  return new Promise((resolve, reject) => {
    payment.getBrandWCPayRequestParams(order, (err, payargs) => {
      if (err) {
        debug(err)
        resolve({ err })
      }
      resolve(payargs)
    })
  })
}