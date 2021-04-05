import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../src/app'

const repository = {
  name: 'React'
}

const invalidRepository = {
  name: 'RepositoryNameDoesNotExist'
}

describe('LibQuality', () => {
  let mongoServer
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  })

  afterAll(async () => {
    mongoose.disconnect()
    await mongoServer.stop()
  })

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) {
      await collection.deleteMany({})
    }
  })

  it('# Create a new repository', async () => {
    const response = await request(app).get(
      `/repositories/search/${repository.name}`
    )

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
  })

  it('# Update repository', async () => {
    const response = await request(app).get(
      `/repositories/search/${repository.name}`
    )

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
  })

  it('# Invalid repository', async () => {
    const response = await request(app).get(
      `/repositories/search/${invalidRepository.name}`
    )

    expect(response.status).toBe(404)
  })

  it('# Get Repository without passing the name ', async () => {
    const response = await request(app).get('/repositories/search/')

    expect(response.status).toBe(404)
  })

  it('# List of all registered repositories', async () => {
    const response = await request(app).get('/repositories')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })
})
