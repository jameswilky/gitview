class UI {
  constructor() {
    this.gallery = document.querySelector('.gallery')
  }
  toggleFolder(btn) {
    let folders = document.querySelectorAll('.folder')
    let visible = folders[0].classList.contains('visible')
    if (visible) {
      btn.innerHTML = 'Show Folders'
    }
    else {
      btn.innerHTML = 'Hide Folders'
    }
    folders.forEach(folder => {
      folder.classList.toggle('visible')

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
      this.gallery.innerHTML += output;
      this.fitImage(this.gallery.lastElementChild)
    }
    img.src = blob
  }
  resizeImage(size) {

    this.gallery.style['grid-template-columns'] = `repeat(auto-fit, ${size}px)`;
    this.gallery.style['grid-auto-rows'] = `${size}px`;

  }

  showSVG(svg) {
    let output = '';

    output += `
      <div class = "item">
        ${svg}
      </div>
      `;
    //Output repos
    this.gallery.innerHTML += output;
  }

  createFolder(name, url) {
    let output = ''
    output +=
      `
      <div class = "item folder visible">
        <img src = "images/folder.png" title=${name}>
        <div>
        ${name}
        <div/>
        <input type="hidden" value=${url}>
      </div>
      `

    this.gallery.innerHTML += output;
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
  clearGallery() {
    this.gallery.innerHTML = ''
  }


}