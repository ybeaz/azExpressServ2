var fs = require('fs')

const givePermission = path => {
  fs.chmodSync(path, 0o777)
}

givePermission('./dist/index.js')
