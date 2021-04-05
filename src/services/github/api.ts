import axios, { AxiosInstance } from 'axios'

class GitHub {
    private service: AxiosInstance
    private AuthToken: string

    public constructor () {
      this.service = axios.create({
        baseURL: 'https://api.github.com/'
      })

      this.AuthToken = process.env.GITHUB_TOKEN ? 'Bearer ' + process.env.GITHUB_TOKEN : ''
    }

    public issues (repositoryName: string, page = 1, per_page = 100) {
      return this.service.get(`repos/${repositoryName}/issues`, {
        headers: {
          Authorization: this.AuthToken
        },
        params: {
          page: page,
          state: 'open',
          per_page: per_page
        }
      })
    }

    public searchRepository (repositoryName: string, page = 1, per_page = 1) {
      return this.service.get('search/repositories', {
        headers: {
          Authorization: this.AuthToken
        },
        params: {
          q: repositoryName,
          page: page,
          per_page: per_page
        }
      })
    }
}

export default new GitHub()
