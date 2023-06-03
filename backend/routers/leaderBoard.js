const router = require('express').Router()
const cookieParser = require('cookie-parser')
const leadersConroller = require('../controllers/leaderBoard')
router.use(cookieParser())

router.post('/api/get_leaders', leadersConroller.get_leaders)

module.exports = router
