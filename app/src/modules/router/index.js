import express from 'express'

import AuthRouter from '../auth/router'
import UserRouter from '../user/router'
import AminRouter from '../admin/router'

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/admin', AminRouter)

export default router
