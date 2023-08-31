import service from './service'

export default {
  getAllProject: async (req, res) => {
    try {
      const response = await service.allProjects()
      return res.status(response.statusCode).json(response)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  getProjectById: async (req, res) => {
    try {
      const { proId } = req.params
      const response = await service.projectById(proId)
      return res.status(response.statusCode).json(response)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  getCard: async (req, res) => {
    try {
      const { proId, cardId } = req.params
      const response = await service.getCard(proId, cardId)
      return res.status(response.statusCode).json(response)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  updateProjectCards: async (req, res) => {
    try {
      const { proId, cardId } = req.params
      const { body } = req
      const response = await service.updateCard(proId, cardId, body)
      return res.status(response.statusCode).json(response)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
}
