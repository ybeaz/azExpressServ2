const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('rootView', {})
})

router.get('/test-analytics', (req, res) => {
  res.render('testAnalytics', {})
})

router.get('/test', (req, res) => {
  res.render('testView', {
    title: 'Test page',
    h1: 'Hello World!',
    p1: 'This server uses a <a href="https://www.npmjs.com/package/ejs" target="_blank">ejs template</a> for the html output',
    p2: 'This sever supports API get requests with query parameters ',
    f1: 'For support, please, call +1 650 7 410014',
  })
  // res.send('Hello World')
})

// To do
router.post('/url', (req, res, next) => {
  // your code
})

module.exports = router
