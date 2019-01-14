class UI {
  constructor() {
    this.folderToggleBtn = document.querySelector('.folderToggle');
    this.folderToggleBtn.addEventListener('click', () => {
      let folders = document.querySelectorAll('.folder')

      let visible = folders[0].classList.contains('visible')

      if (visible) {
        this.folderToggleBtn.innerHTML = 'Show Folders'
      }
      else {
        this.folderToggleBtn.innerHTML = 'Hide Folders'

      }

      folders.forEach(folder => {
        folder.classList.toggle('visible')

      })

    })
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

  showSVG(svg) {
    let output = '';

    output += `
      <div class = "item">
        ${svg}
      </div>
      `;
    //Output repos
    let parent = document.querySelector('.gallery')
    parent.innerHTML += output;
  }

  createFolder(name, url) {
    let output = ''
    output +=
      `
      <div class = "item folder visible">
        <img src = "images/folder.png">
        <div>
        ${name}
        </div>
      </div>
      `
    let parent = document.querySelector('.gallery')
    parent.innerHTML += output;
  }
  fitImage(item) {
    const img = item.firstElementChild
    const h = img.naturalHeight
    const w = img.naturalWidth


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