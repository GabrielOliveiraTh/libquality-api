import GitHub from './api'
import { average, standardDeviation } from '../../helpers/math'

class GitHubService {
  public async searchByRepository (repositoryName: string) {
    const response = await GitHub.searchRepository(repositoryName)
    const data = response.data

    if (data.total_count === 0) {
      return null
    }

    return data.items[0]
  }

  public async getRepositoryIssuesInfo (repositoryName: string) {
    let page = 1
    const infoFirstPage = await GitHub.issues(repositoryName, page)
    let response = infoFirstPage.data.map(data => data)

    while (response.length % 100 === 0) {
      page++
      const info = await GitHub.issues(repositoryName, page)
      response = response.concat(info.data)
    }

    response = response.map((v) => { return { created_at: v.created_at } })
    const now = new Date()
    const daysFromCreationAt = response.map((obj) => {
      return Math.trunc((now.getTime() - (new Date(obj.created_at)).getTime()) / (1000 * 3600 * 24))
    })

    const issues = response.length
    const averageDays = average(daysFromCreationAt)
    const standardDeviationDays = standardDeviation(daysFromCreationAt)

    return {
      issues: issues,
      avgAge: averageDays,
      stdAge: standardDeviationDays
    }
  }
}

export default new GitHubService()
