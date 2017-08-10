import { to_json } from 'xmljson'
const xmlToJson = (items) => {
  return new Promise((resolve, reject) => {
    let values = {}
    to_json(items, (err, data) => {
      if (err) {
        return reject(values)
      }
      try {
        for (let i = 0; i < data.fill.items.item[0].length; i++) {
          let status = data.fill.items.item[i]['$']
          values[status.name] = status.value
        }
      } catch (err) {
        console.log(err)
        values = {}
      }
      resolve(values)
    })
  })
}

export default {
  xmlToJson
}
