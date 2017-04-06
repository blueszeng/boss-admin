import Ccap from 'ccap'

const ccap = Ccap({
  width: 200,
  height: 50,
  offset: 30,
  quality: 100,
  fontsize: 40
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
