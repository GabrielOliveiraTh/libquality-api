# LibQuality - API

We will build a new tool called LibQuality whose main goal is to measure the quality of famous open source projects like React (https://github.com/facebook/react), Angular (https://github.com/angular/angular), Vue (https://github.com/vuejs/vue) among others. Check out the rough sketch of it.

### How it works

When the user types the name of the repository to search, the api checks whether the repository exists, if not, it returns status 404.
With the repository valid, it scans all open issues and calculates average and standard deviation, returning to the user.

### BACK-END
-   [Node.js](https://nodejs.org/en/)
-   [Npm](https://www.npmjs.com/)
-   [Express](https://expressjs.com/)
-   [nodemon](https://nodemon.io/)
-   [Sucrase](https://github.com/alangpierce/sucrase)
-   [Docker](https://www.docker.com/docker-community)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [DotEnv](https://www.npmjs.com/package/dotenv)
-   [Swagger](https://swagger.io/)
-   [Winston](https://github.com/winstonjs/winston)
-   [Jest](https://jestjs.io/)


### Installation 

To clone and run this application, you will need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/docker-community) + [Docker-Compose](https://docs.docker.com/compose/install/) + [Npm](https://www.npmjs.com/) installed on your computer.

On the command line: 

```bash
# Clone
$ git clone https://github.com/GabrielOliveiraTh/libquality-api.git

# Navigate to the directory
$ cd libquality-api

# Run project
$ docker-compose up

# Stop project
$ ctrl + c
$ docker-compose down
$ docker-compose stop

# Run test
$ npm test
```

### Documentation
* http://localhost:3000/api-docs

### BASE URL
* http://localhost:3000

### ENDPOINTS

#### Welcome route
* GET /

#### List all repositories
* GET /repositories

#### Search repository by name 
* GET /repositories/search/{repository-name}
