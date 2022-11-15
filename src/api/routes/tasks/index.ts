import express from 'express'
import {
    getAllTasks,
} from '../../controllers/tasks'
import checkAuth from '../../middleware/check-auth'

const router = express.Router()

router.use(checkAuth)
router.get('/', getAllTasks)
// router.post('/', createOneDataItem)
// router.get('/:id', getOneDataItem)
// router.put('/:id', updateOneDataItem)
// router.delete('/:id', deleteOneDataItem)

export default router
