class Github {
  constructor() {
    this.client_id = '8378f3d58cd1f204c19f';
    this.client_secret = '7f0ffd186562109772bd8fb25c81554c1ccc50b7';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)


    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_pafge=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();


    return {
      profile,
      repos
    }
  }
}