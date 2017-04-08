import Ccap from 'ccap'

const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const generateMixed = (n) => {
  let res = ''
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 10)
    res += chars[id]
  }
  return res
}
const ccap = Ccap({
  width: 180,
  height: 50,
  offset: 40,
  quality: 10,
  fontsize: 50,
  generate: function () {
    return generateMixed(4)
  }
})
const getCaptcha = () => {
  let ary = ccap.get()
  return {
    'text': ary[0],
    'image': ary[1]
  }
}
export default {
  getCaptcha
}
