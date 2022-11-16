import express from 'express'
import { getDataItemsPage } from '../../controllers/paginated-data'
import checkAuth from '../../middleware/check-auth'

const router = express.Router()

router.use(checkAuth)
router.get('/', getDataItemsPage)

export default router
