import express from 'express'

import AdminController from './controller'
import Auth from '../midleware/auth'
import { Admin } from '../midleware/role'

import validate from '../midleware/validators'

const router = express.Router()

router.get('/projects', Auth, Admin, AdminController.getAllProject)
router.get('/projects/:proId', Auth, Admin, AdminController.getProjectById)
router.get(
  '/projects/:proId/card/:cardId',
  Auth,
  Admin,
  AdminController.getCard
)
router.put(
  '/projects/:proId/card/:cardId',
  Auth,
  Admin,
  validate.UpdateCardValidator,
  AdminController.updateProjectCards
)

export default router
