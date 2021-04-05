import { Router } from 'express'
import RepositoryController from './controllers/RepositoryController'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'

const routes = Router()

// serve swagger api
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * definitions:
 *   Repository:
 *     properties:
 *       _id:
 *         type: string
 *       owner:
 *         type: string
 *       name:
 *         type: string
 *       fullName:
 *         type: string
 *       issues:
 *         type: number
 *       avgAge:
 *         type: number
 *       stdAge:
 *         type: number
 */

/**
 * @swagger
 *
 * /repositories:
 *   get:
 *     tags:
 *       - Repository
 *     summary: Lists all repositories registered in the database
 *     description: Returns all registered repositories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return information from repositories
 *         schema:
 *           $ref: '#/definitions/Repository'
 *       500:
 *         description: An error has occurred
 */

// Returns all registered repositories
routes.get('/repositories', RepositoryController.index)

/**
 * @swagger
 *
 * /repositories/search/{name}:
 *   get:
 *     tags:
 *       - Repository
 *     summary: Search for a repository on Github
 *     description: Search for a repository on github and register in the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Repository name
 *         in:  path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns repository information
 *         schema:
 *           $ref: '#/definitions/Repository'
 *       500:
 *         description: An error has occurred.
 *       404:
 *         description: Repository not found
 */
routes.get('/repositories/search/:name', RepositoryController.search)

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to LibQuality API' })
})

export default routes
