import express from 'express'

import UserController from './controller'
import Auth from '../midleware/auth'
import validate from '../midleware/validators'

const router = express.Router()

router.post(
  '/project',
  Auth,
  validate.CreateProjectValidator,
  UserController.createProject
)
router.get('/project/:proId', Auth, UserController.projectById)
router.put(
  '/project/:proId',
  Auth,
  validate.updateProjectValidator,
  UserController.updateProject
)
router.delete('/project/:proId', Auth, UserController.deleteProject)

// cards

router.post(
  '/project/:proId/card',
  Auth,
  validate.CreateCardValidator,
  UserController.addCard
)
router.get('/project/:proId/card', Auth, UserController.allcards)

router.get('/project/:proId/card/:cardId', Auth, UserController.cardById)
router.put(
  '/project/:proId/card/:cardId',
  validate.UpdateCardValidator,
  Auth,
  UserController.updateCard
)
router.delete('/project/:proId/card/:cardId', Auth, UserController.removeCard)
router.post(
  '/project/:proId/card/:cardId/reminder',
  Auth,
  UserController.addReminder
)

export default router
