class Github {
  constructor() {
    this.client_id = '8f1cd47c8b186a34c542';
    this.client_secret = '60a0047b85b25e76e28548a46860bc222be8a255';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'
  }

  async getRepo(url) {
    const tokens = url.split("/")
    const user = tokens[3]
    const repo_name = tokens[4]
    const repoResponse = await fetch(`https://api.github.com/repos/${user}/${repo_name}/contents?client_id=${this.client_id}&client_secret=${this.client_secret}`)

    const repo = await repoResponse.json();
    return {
      repo
    }
  }

  async openDir(url) {
    const dirResponse = await fetch(`${url}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
    const dir = await dirResponse.json()

    return {
      dir
    }
  }

  // async getUser(user) {
  //   const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
  //   const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)

  //   const profile = await profileResponse.json();
  //   const repos = await repoResponse.json();


  //   return {
  //     profile,
  //     repos
  //   }
  // }
}