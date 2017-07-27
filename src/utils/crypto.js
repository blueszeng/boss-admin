import crypto from 'crypto'
const cipherSecret = "zzzz"
const cipheralgorithm = "aes192"
const encryptCipher = async (str) => {
  var cipher = crypto.createCipher(cipheralgorithm, cipherSecret);
  var enc = cipher.update(str, "utf8", "hex");
  enc += cipher.final("hex")
  // console.log(enc)
  return Promise.resolve(enc)
}

const decryptCipher = async (str) => {
  var decipher = crypto.createDecipher(cipheralgorithm, cipherSecret);
  var dec = decipher.update(str, "hex", "utf8");
  dec += decipher.final("utf8");
  // console.log(dec)
  return Promise.resolve(dec)
}

export default {
  encryptCipher,
  decryptCipher
}
