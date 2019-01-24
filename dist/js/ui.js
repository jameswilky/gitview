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

    this.gallery__fileInvisible = false
    this.gallery__folderInvisible = false
    this.gallery__imageInvisible = false

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


  parseImage(blob, name, className, fileType, url = '') {
    let image = new Image();
    let item, title, input;
    const createImageContainer = () => {
      // Check if item should be visible
      let visibility = 'visible'
      if (this[`${className}Invisible`]) {
        visibility = 'invisible'
      }

      item = document.createElement('div')
      item.classList.add(className, 'item', visibility)
      item.appendChild(image)
    }
    const createTitle = () => {
      title = document.createElement('div')
      title.innerHTML = name
      item.appendChild(title)
    }
    const createURL = () => {
      input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('value', url)
      item.appendChild(input)
    }

    createImageContainer()

    // If item is file or a folder create a title and a link to the github page/next folder
    if (!(className == 'gallery__image')) {
      createTitle()
      createURL()
    }





    //If file is an SVG, conver to PNG and append
    if (fileType == 'svg') {
      this.svgToPng(blob, image) //svg to png
      this.gallery.appendChild(item)

    }
    //Otherwise load image and append once loaded
    else if (fileType == 'png') {
      //Need to wait untill image is loaded before appending to gallery
      image.onload = () => {
        if (className == 'gallery__image') {
          this.fitItem(item)
        }
        this.gallery.appendChild(item)
      }
      image.src = blob
      image.title = name

    }




  }



  svgToPng(svg, targetImage) {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    targetImage.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
    targetImage.src = url;
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
    // Resizes excessively tall or wide images to expand across multiple grid cells
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

