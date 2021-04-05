import swaggerJSDoc from 'swagger-jsdoc'

// swagger definition
const swaggerDefinition = {
  info: {
    description: 'LibQuality',
    swagger: '2.0',
    title: 'Swagger - API LibQuality',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/'
}

// options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes.ts']
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
