import service from './service'

export default {
  createProject: async (req, res) => {
    try {
      const { body } = req
      body.user = req.user._id
      const response = await service.addProject(body)
      return res.status(response.statusCode).json(response.project)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  projectById: async (req, res) => {
    try {
      const { proId } = req.params
      const userId = req.user._id
      const response = await service.getProject(proId, userId)
      return res.status(response.statusCode).json(response.project)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  updateProject: async (req, res) => {
    try {
      const { proId } = req.params
      const { body } = req
      const userId = req.user._id
      const response = await service.updateProeject(proId, userId, body)
      return res.status(response.statusCode).json(response.project)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { proId } = req.params
      const userId = req.user._id
      const response = await service.deleteProject(proId, userId)
      return res.status(response.statusCode).json(response.message)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  addCard: async (req, res) => {
    try {
      const { body } = req
      const { proId } = req.params
      const userId = req.user._id
      const where = { _id: proId, user: userId }
      const response = await service.addCard(body, where)
      return res.status(response.statusCode).json(response.message)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  allcards: async (req, res) => {
    try {
      const { proId } = req.params
      const userId = req.user._id
      const where = { _id: proId, user: userId }
      const response = await service.cards(where)
      return res.status(response.statusCode).json(response.cards)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  cardById: async (req, res) => {
    try {
      const { proId, cardId } = req.params
      const userId = req.user._id
      const response = await service.getCard(proId, cardId, userId)
      return res.status(response.statusCode).json(response.card)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  updateCard: async (req, res) => {
    try {
      const { proId, cardId } = req.params
      const userId = req.user._id
      const { body } = req
      const response = await service.updateCard(proId, cardId, userId, body)
      return res.status(response.statusCode).json(response.message)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  removeCard: async (req, res) => {
    try {
      const { proId, cardId } = req.params
      const userId = req.user._id
      const response = await service.removeCard(proId, cardId, userId)
      return res.status(response.statusCode).json(response.message)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  addReminder: async (req, res) => {
    try {
      const { proId, cardId } = req.params
      const { body } = req
      const userId = req.user._id
      const response = await service.addReminder(proId, cardId, userId, body)
      return res.status(response.statusCode).json(response.message)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
}
