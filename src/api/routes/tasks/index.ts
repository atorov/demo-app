import express from 'express'
import {
    getAllTasks,
    getOneTask,
} from '../../controllers/tasks'
import checkAuth from '../../middleware/check-auth'

const router = express.Router()

router.use(checkAuth)
router.get('/', getAllTasks)
router.get('/:taskId', getOneTask)
// router.post('/', createOneDataItem)
// router.put('/:id', updateOneDataItem)
// router.delete('/:id', deleteOneDataItem)

export default router
