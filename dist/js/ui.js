class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showImage(blob) {
    // blob is an image object
    let output = '';
    let img = document.createElement('img')
    img.src = blob
    output += `
      <div class = "item">
        ${img.outerHTML}
      </div>
      `;
    //Output repos
    document.querySelector('.gallery').innerHTML += output;
  }

  resizeImages() {
    const items = document.querySelectorAll('.gallery > div > img')
    items.forEach(item => {
      const h = item.naturalHeight
      const w = item.naturalWidth
      console.log(h, w)

      if (h >= (2 * w)) {
        console.log('item is tall')
        item.parentNode.classList.add('h2')
      }
      if ((2 * h) <= w) {
        console.log('item is wide')

        item.parentNode.classList.add('w2')
      }
    })
  }
  // showRepo(){
  //   let output = 
  // }
  // showRepos(repos) {
  //   let output = '';

  //   repos.forEach(function (repo) {
  //     output += `
  //     <div class="card card-body" mb-2>
  //       <div class="row">
  //         <div class="col-md-6">
  //           <a href="${repo.html_url}" target="_blank">${repo.name}</a>
  //         </div>
  //         <div class="col-md-6">
  //           <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span> 
  //           <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span> 
  //           <span class="badge badge-success">Forks: ${repo.forks_count}</span> 
  //         </div>
  //       </div>
  //     </div>
  //     `;
  //   })

  //   //Output repos
  //   document.getElementById('repos').innerHTML = output;
  // }
  // Show alert messages
  showAlert(message, className) {
    //Clear any remaining alerts
    this.clearAlert();
    //get parent
    const container = document.querySelector('.searchContainer');
    //get search box
    const search = document.querySelector('.search');


    // Create div
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message)) //add text


    //insert alert
    container.insertBefore(div, search)

    // remove after 3 sec
    setTimeout(() => {
      this.clearAlert()
    }, 3000);
  }

  //Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert')

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  //Clear profile
  clearProfile() {
    this.profile.innerHTML = ''
  }
}