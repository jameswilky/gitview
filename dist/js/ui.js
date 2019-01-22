class UI {
  constructor() {
    this.folderIcon = "images/folder.png"


    /*ToolBar*/
    this.toolbar = document.querySelector('.toolbar')
    this.folderToggle = document.querySelector('.toolbar__folderToggle');
    this.fileToggle = document.querySelector('.toolbar__fileToggle')
    this.backBtn = document.querySelector('.toolbar__back');
    this.clearBtn = document.querySelector('.toolbar__clear')
    this.slider = document.querySelector('.toolbar__slider');
    this.slider.oninput = () => {
      this.resizeItem(this.slider.value);
    }


    /*Gallery*/
    this.gallery = document.querySelector('.gallery')

    this.fileInvisible = false
    this.folderInvisible = false
    this.items;


    /*Overlay*/
    this.overlay = document.querySelector('.overlay');
    this.overlayInner = document.querySelector('.overlay-inner')
    this.overlayTitle = this.overlay.querySelector('h4')

    this.overlayClose = this.overlay.querySelector('.close');


  }


  showToolbar() {
    this.toolbar.style.display = "grid"
  }


  toggleItem(target, button) {

    // Turn off generation of specified icon
    if (this[`${target.replace('.', '')}Invisible`] == true) {
      //If Invisible
      this[button].classList.remove('fas--off')
      this[`${target.replace('.', '')}Invisible`] = false
    }
    else if (this[`${target.replace('.', '')}Invisible`] == false) {
      //If Visible
      this[button].classList.add('fas--off')
      this[`${target.replace('.', '')}Invisible`] = true
    }

    //Clear Currently displayed specified icons
    let items = document.querySelectorAll(target)
    if (items) {
      items.forEach(item => {
        item.classList.toggle('invisible')
        item.classList.toggle('visible')
      })
    }
  }

  openImage(image) {
    this.overlayImage.src = image.src
    this.overlayTitle.innerHTML = image.title;
    this.overlay.classList.add('open')
    this.imageZoomResult.style.display = "initial"

    this.imageZoom("overlay__image")
  }

  openOverlay(item) {
    let img
    let svg

    if (item.firstElementChild.nodeName == 'svg') { //if item is an svg file
      svg = item.firstElementChild.cloneNode(true)
      svg.setAttribute('id', 'overlay__image')
      this.overlayInner.appendChild(svg)
      this.overlayTitle.innerHTML = item.lastElementChild.innerText

    }
    else if (item.firstElementChild.nodeName == 'IMG') { //If item is a different image file
      img = document.createElement('img')
      img.setAttribute('id', 'overlay__image')
      img.src = item.firstElementChild.src
      this.overlayInner.appendChild(img)
      this.overlayTitle.innerHTML = item.firstElementChild.title;
    }

    this.overlay.classList.add('open')
  }

  closeOverlay() {

    let img = document.getElementById('overlay__image')
    img.parentNode.removeChild(img)

    this.overlay.classList.remove('open');

  }

  showImage(blob, name) {
    // blob is an image object
    let img = new Image();


    img.onload = () => {
      let output = '';
      output += `
      <div class="item gallery-image">
        ${img.outerHTML}
      </div>
      `;
      //Output repos
      this.gallery.innerHTML += output;
      this.fitItem(this.gallery.lastElementChild)
    }
    img.src = blob
    img.title = name;
  }

  showSVG(image, name) {
    let output = ''
    output += `
      <div class="item gallery-image">
        ${image}
        <div>
        ${name}
        <div/>
        <input type="hidden">

      </div>
      `;
    //Output repos
    this.gallery.innerHTML += output;
    this.gallery.lastChild.firstChild.title = name
  }

  showIcon(image, name, url, className) {
    let visibility = 'visible'
    if (image == "folder") {
      image = this.createFolder(name)
    }
    if (this[`${className}Invisible`]) {
      visibility = 'invisible'
    }
    let output = '';
    output += `
      <div class="item ${className} ${visibility}">
        ${image}
        <div>
        ${name}
        <div/>
        <input type="hidden" value=${url}>

      </div>
      `;
    //Output repos
    this.gallery.innerHTML += output;
  }
  createFolder(name) {
    let img = document.createElement('img')
    img.src = this.folderIcon
    img.title = name
    return img.outerHTML
  }

  resizeItem(value) {
    let size;
    if (value == 1) {
      size = 48;
      this.gallery.style['font-size'] = '0%';
    }
    if (value == 2) {
      size = 96
      this.gallery.style['font-size'] = '100%';
    }
    if (value == 3) {
      size = 192
      this.gallery.style['font-size'] = '100%';
    }
    this.gallery.style['grid-template-columns'] = `repeat(auto-fit, ${size}px)`;
    this.gallery.style['grid-auto-rows'] = `${size}px`;
  }
  fitItem(item) {
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

