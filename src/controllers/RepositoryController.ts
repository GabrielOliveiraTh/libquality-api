import { Request, Response } from 'express'
import GitHubService from '../services/github/service'
import { Repository } from '../schemas/Repository'
import Logger from '../utils/logger'

class RepositoryController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      Logger.info('RepositoryController::index => Starting repository listing')
      const repositories = await Repository.find()
      Logger.info('RepositoryController::index => Repositories successfully returning')
      return res.json(repositories)
    } catch (err) {
      Logger.error('RepositoryController::index => Failed to list repositories')
      Logger.error(err)
      return res.status(500).send({ error: 'An error has occurred' })
    }
  }

  public async search (req: Request, res: Response): Promise<Response> {
    try {
      Logger.info('RepositoryController::search => Starting repository search')

      const { name } = req.params
      const repositoryInfo = await GitHubService.searchByRepository(name)

      if (!repositoryInfo) {
        Logger.error('RepositoryController::search => Repository not found')
        return res.status(404).json({ error: 'Repository not found' })
      }

      Logger.info('RepositoryController::search => Repository found successfully')

      const repositoryIssuesInfo = await GitHubService.getRepositoryIssuesInfo(repositoryInfo.full_name)
      const data = {
        owner: repositoryInfo.owner.login,
        name: repositoryInfo.name,
        fullName: repositoryInfo.full_name,
        ...repositoryIssuesInfo
      }

      Logger.info('RepositoryController::search => Repository information found successfully')

      const hasRepository = await Repository.findOne({ fullName: repositoryInfo.full_name })

      let repository
      if (hasRepository) {
        Logger.info('RepositoryController::search => Repository already registered')
        repository = await Repository.findOneAndUpdate({ fullName: repositoryInfo.full_name }, data, { new: true })
      } else {
        Logger.info('RepositoryController::search => Successfully registered repository')
        repository = await Repository.create(data)
      }

      return res.json(repository)
    } catch (err) {
      console.log(err)
      Logger.error('RepositoryController::index => Failed to search repositories')
      Logger.error(err)
      return res.status(500).send({ error: 'An error has occurred' })
    }
  }
}

export default new RepositoryController()
