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

    /*Zoom Lens*/
    this.imageZoomResult = document.querySelector('.img-zoom-result')

    /*Gallery*/
    this.gallery = document.querySelector('.gallery')

    this.fileInvisible = false
    this.folderInvisible = false

    this.items;


    /*Overlay*/
    this.overlay = document.querySelector('.overlay');
    this.overlayImage = this.overlay.querySelector('img');
    this.overlayTitle = this.overlay.querySelector('h4')
    this.overlayImage.addEventListener('mouseenter', e => {
      this.imageZoomResult.style.display = "initial"
    })
    this.overlayImage.addEventListener('mouseleave', e => {
      this.imageZoomResult.style.display = "none"

    })
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

    this.imageZoom("myimage")
  }

  closeOverlay() {
    this.imageZoomResult.style.display = "none"
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

  imageZoom(imgID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = this.imageZoomResult
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      let pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      let a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left - 20; // removed 20 pixels due to padding
      y = e.pageY - a.top - 20;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }


}

document.addEventListener('mousemove', e => {
  let div = document.querySelector(".img-zoom-result")
  div.style.left = e.pageX + 'px'
  div.style.top = e.pageY + 'px'
})