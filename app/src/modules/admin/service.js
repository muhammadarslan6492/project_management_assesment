import { Conflict, BadRequest, NotFound } from 'fejl'

import Repo from '../repo'

import { Project } from '../model'
import socketServer from '../../index'

class service extends Repo {
  constructor() {
    super(Project)
  }

  async allProjects() {
    const projecs = await this.find()
    const response = {
      statusCode: 200,
      projecs,
    }
    console.log('this is project', projecs)
    return response
  }
  async projectById(proId) {
    const projecs = await this.findById({ _id: proId })
    const response = {
      statusCode: 200,
      projecs,
    }
    return response
  }

  async getCard(proId, cardId) {
    const where = { _id: proId }
    const project = await this.findOne(where)
    if (!project) {
      throw new NotFound('Project not found')
    }
    const card = project.cards.id(cardId)
    if (!card) {
      throw new NotFound('Card not found')
    }
    const response = {
      statusCode: 200,
      card,
    }
    return response
  }

  async updateCard(proId, cardId, body) {
    const where = { _id: proId }
    const project = await this.findOne(where)
    if (!project) {
      throw new NotFound('Project not found')
    }
    let card = project.cards.id(cardId)
    if (!card) {
      throw new NotFound('Card not found')
    }
    card.todo = body.todo ? body.todo : card.todo
    card.status = body.status ? body.status : card.status
    card.priority = body.priority ? body.priority : card.priority

    await project.save()

    const notificationsData = {
      card: cardId,
      status: 'Updated by Admin',
    }
    socketServer.generateNotification(project.user, notificationsData)
    const response = {
      statusCode: 200,
      message: 'Card successfully updated',
    }
    return response
  }
}

export default new service()
