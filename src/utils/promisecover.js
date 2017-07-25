export function promisify(fn, receiver) {
    return function () {
        for (var _len = argument.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }

        return new Promise(function (resolve, reject) {
            fn.apply(receiver, [].concat(args, [function (err, res) {
                return err ? reject(err) : resolve(res)
            }]))
        })
    }
}