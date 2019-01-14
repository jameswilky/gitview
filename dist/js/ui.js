class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }
  showImage(blob) {
    // blob is an image object
    let img = new Image();
    img.onload = () => {
      let output = '';

      output += `
      <div class = "item">
        ${img.outerHTML}
      </div>
      `;
      //Output repos
      let parent = document.querySelector('.gallery')
      parent.innerHTML += output;
      this.fitImage(parent.lastElementChild)
    }
    img.src = blob
  }
  resizeImage(size) {
    let grid = document.querySelector('.gallery')
    grid.style['grid-template-columns'] = `repeat(auto-fit, ${size}px)`;
    grid.style['grid-auto-rows'] = `${size}px`;

  }

  showSprite(image) {
    // make ajax call to https://github.com/dmhendricks/file-icon-vectors/blob/master/dist/icons/classic/msi.svg
  }

  fitImage(item) {
    const img = item.firstElementChild
    const h = img.naturalHeight
    const w = img.naturalWidth
    console.log(h, w)


    if (h >= (2 * w)) {
      item.classList.add('h2')
    }
    else if ((2 * h) <= w) {
      item.classList.add('w2')
    }

    else if (h > 480 && w > 480) {
      item.classList.add('h2')
      item.classList.add('w2')
    }
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