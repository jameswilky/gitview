class Github {
  constructor() {
    this.client_id = '8f1cd47c8b186a34c542';
    this.client_secret = '60a0047b85b25e76e28548a46860bc222be8a255';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'
    this.activeBranch;
    this.blankFileUrl = `https://raw.githubusercontent.com/dmhendricks/file-icon-vectors/master/dist/icons/vivid/blank.svg`
  }


  async getRepo(url, initial = false) {
    const tokens = url.split("/")
    const user = tokens[3]
    const repo_name = tokens[4]

    let api_url
    if (initial) { //First call of this function is needed to determine the branch type
      api_url = `https://api.github.com/repos/${user}/${repo_name}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    }
    else {
      api_url = `https://api.github.com/repos/${user}/${repo_name}/contents?client_id=${this.client_id}&client_secret=${this.client_secret}`
    }
    const repoResponse = await fetch(api_url)
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

  async openImage(file) {
    const tokens = file.url.split("/")
    const user = tokens[4]
    const repo_name = tokens[5]
    let url = `https://raw.githubusercontent.com/${user}/${repo_name}/${this.activeBranch}/${file.path}`

    const imageResponse = await fetch(url)

    const image = await imageResponse.blob();
    return {
      image
    }
  }

  async openSVG(file) {
    const tokens = file.url.split("/")
    const user = tokens[4]
    const repo_name = tokens[5]
    let url = `https://raw.githubusercontent.com/${user}/${repo_name}/${this.activeBranch}/${file.path}`

    const imageResponse = await fetch(url)

    const image = await imageResponse.text();
    return {
      image
    }

  }

  async getFileIcon(filetype) {
    const url = `https://raw.githubusercontent.com/dmhendricks/file-icon-vectors/master/dist/icons/vivid/${filetype}.svg`
    let response = await fetch(url)
    let svg
    if (response.ok) {
      svg = await response.text();
    }
    else { //If file not found use blank file
      response = await fetch(this.blankFileUrl)
      svg = await response.text();
    }
    return {
      svg
    }
  }


}