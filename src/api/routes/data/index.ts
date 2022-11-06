import express from 'express'
import getData from '../../controllers/data/{{get}}'
import checkAuth from '../../middleware/check-auth'

const router = express.Router()

router.use(checkAuth)
router.get('/', getData)

export default router
