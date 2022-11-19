import express from 'express'
import {
    createOneTask,
    deleteOneTask,
    getAllTasks,
    getOneTask,
    updateOneTask,
} from '../../controllers/tasks'
import checkAuth from '../../middleware/check-auth'

const router = express.Router()

router.use(checkAuth)
router.get('/', getAllTasks)
router.post('/', createOneTask)
router.get('/:taskId', getOneTask)
router.patch('/:taskId', updateOneTask)
router.delete('/:taskId', deleteOneTask)

export default router
