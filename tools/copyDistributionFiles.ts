var fs = require('fs')
var ncp = require('ncp').ncp

const dir = './dist'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const copyFileDir = (src, dist) => {
  ncp.limit = 16
  ncp.clobber = true
  ncp(src, dist, function (err) {
    if (err) {
      return console.error(`[error with coping ${src}]`, err)
    }
    console.log(`${src} is copied`)
  })
}

const copyArr = [
  { src: `package.json`, dist: 'dist/package.json' },
  { src: `.env.production`, dist: 'dist/.env.production' },
  { src: `src/views`, dist: 'dist/views' },
]

copyArr.forEach(item => copyFileDir(item.src, item.dist))
