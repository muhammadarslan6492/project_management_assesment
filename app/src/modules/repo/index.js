import { ObjectId } from 'mongoose'
import { Conflict, BadRequest, NotFound } from 'fejl'

export default class Repo {
  constructor(model) {
    this.model = model
  }

  async create(payload) {
    try {
      const response = await this.model.create(payload)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async find(qp = {}) {
    try {
      const response = await this.model.find(qp)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
  async findById(id) {
    try {
      const response = await this.model.findById(id)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(obj) {
    try {
      const response = await this.model.findOne(obj)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateOne(where, data) {
    try {
      const response = await this.model.updateOne(where, { $set: data })
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async removeSubDoc(where, sq) {
    try {
      const response = await this.model.findByIdAndUpdate(
        where,
        { $pull: sq },
        {
          new: true,
        }
      )
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async delete(where) {
    try {
      const response = await this.model.deleteOne(where)
      return response.deletedCount > 0
    } catch (error) {
      throw new Error(error)
    }
  }
}
