const router = require('express').Router()

// Test URL for Hello World
router.get('/user/:first?/:second?', (req, res) => {

  //db.webAnalytics.find({'PHPSESSID' : '4855b16f7fff75719d32b52e0ae7a097'}, { _id: 0 }).pretty()

  const first = req.params.first ? req.params.first : ''
  const second = req.params.second ? req.params.second : ''

  const queryJson = JSON.stringify(req.query)
  const paramsJson = JSON.stringify(req.params)

  // console.info('app.get', first, ' ', second, ' [params]', paramsJson, ' [query]', queryJson, ' [ip]', req.ip)
  const h1 = 'Hi ' + first + ' ' + second + '!'
  const p1 = 'This server uses a <a href="https://pugjs.org/api/getting-started.html" target="_blank">pug template</a> for the html output'
  const p2 = 'This sever supports API get requests with query parameters ' + queryJson
  const f1 = 'For support, please, call +1 650 7 410014'
  res.render('hello_world', { title: 'Hey', h1, p1, p2, f1 })
  // res.send('Hello World')
})

// To do
router.post('/url', (req, res, next) => {
  // your code
 })

module.exports = router
