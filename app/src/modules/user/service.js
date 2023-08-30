import { Conflict, BadRequest, NotFound } from 'fejl'

import Repo from '../repo/index'
import { User, Project } from '../model/index'

class service extends Repo {
  constructor() {
    super(Project)
  }

  async addProject(payload) {
    const project = await this.create(payload)
    const response = {
      statusCode: 201,
      project,
    }
    return response
  }

  async getProject(proId, userId) {
    const where = { _id: proId, user: userId }
    const project = await this.findOne(where)
    const response = {
      statusCode: 200,
      project,
    }
    return response
  }

  async updateProeject(proId, userId, data) {
    const where = { _id: proId, user: userId }
    const project = await this.updateOne(where, data)
    const response = {
      statusCode: 200,
      project,
    }
    return response
  }

  async deleteProject(proId, userId) {
    const where = { _id: proId, user: userId }
    const project = await this.delete(where)
    console.log('this is test', project)
    const response = {
      statusCode: 200,
      message: 'Project deleted successfuly',
    }
    return response
  }

  async addCard(payload, where) {
    const project = await this.findOne(where)
    if (!project) {
      throw new NotFound('Project not found')
    }
    project.cards.push(payload)
    await project.save()

    const response = {
      statusCode: 201,
      message: 'Card successfully created',
    }

    return response
  }

  async cards(where) {
    const project = await this.findOne(where)
    if (!project) {
      throw new NotFound('Project not found')
    }
    const cards = project.cards
    const response = {
      statusCode: 200,
      cards,
    }
    return response
  }

  async getCard(proId, cardId, userId) {
    const where = { _id: proId, user: userId }
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
  async updateCard(proId, cardId, userId, data) {
    const where = { _id: proId, user: userId }
    const project = await this.findOne(where)
    if (!project) {
      throw new NotFound('Project not found')
    }
    let card = project.cards.id(cardId)
    if (!card) {
      throw new NotFound('Card not found')
    }
    card.todo = data.todo ? data.todo : card.todo
    card.status = data.status ? data.status : card.status
    card.priority = data.priority ? data.priority : card.priority

    await project.save()
    const response = {
      statusCode: 200,
      message: 'Card successfully updated',
    }
    return response
  }

  async removeCard(proId, cardId, userId) {
    const where = { _id: proId, user: userId }
    const sq = { cards: { _id: cardId } }
    await this.removeSubDoc(where, sq)
    const response = {
      statusCode: 204,
      message: 'Card successfully deleted',
    }
    return response
  }

  async addReminder(proId, cardId, userId, data) {
    const where = { _id: proId, user: userId }
    const project = await this.findOne(where)
    if (!project) {
      throw new NotFound('Project not found')
    }
    const card = project.cards.id(cardId)
    if (!card) {
      throw new NotFound('Card not found')
    }
    card.reminder.push(data)
    await project.save()
    const response = {
      statusCode: 200,
      message: 'Reminder add to card successfully',
    }
    return response
  }
}

export default new service()
