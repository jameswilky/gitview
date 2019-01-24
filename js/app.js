//Init Github
const github = new Github

//Init UI
const ui = new UI;

//init image parser
// const imageParser = new ImageParser

let history = [];

// Search input
const searchUser = document.getElementById('searchUser');

// Testing URL
const traverseRepo = function (repo) {
  repo.forEach(item => {
    //Identify if string ends in .png/.jpg/.tif/.gif
    isImage = /..*[.](png|jpg|tiff|gif)$/i
    isSVG = /..*[.](svg)$/i

    if (item.type == "file" && isImage.test(item.name)) { //File is png file
      //if file file is an image
      github.openImage(item).then(data => {
        imgURL = URL.createObjectURL(data.image)
        ui.parseImage(imgURL, item.name, 'gallery__image', 'png')
      })
    }
    else if (item.type == 'file' && isSVG.test(item.name)) {
      console.log(`Parsing ${item.name} as an image icon`)

      github.openSVG(item).then(data => {
        ui.parseImage(data.svg, item.name, 'gallery__image', 'svg')
      })
    }
    else if (item.type == "file") {
      //If item is a file but not a picture
      let tokens = item.name.split('.')
      let fileType = tokens.slice(-1)[0]
      github.getFileIcon(fileType.toLowerCase()).then(data => {
        ui.parseImage(data.svg, item.name, 'gallery__file', 'svg', item.html_url)
      })
    }
    else if (item.type == "dir") {
      ui.parseImage(ui.folderIcon, item.name, 'gallery__folder', 'png', item.url)

      //If item is a folder
      // ui.showIcon("folder", item.name, item.url, 'gallery__folder')
    }

  });
}

// Search input event listener
searchUser.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    // Get input text
    let targetRepo = e.target.value;

    let regex = /^(https:\/\/github.com)\/.*\/.*/
    //Checks for https:/github.com/*anything*/*anything*

    //Validate that format is correct
    let valid = regex.test(targetRepo)
    if (valid) {

      github.getRepo(targetRepo, true) //Get Branch type, send true to confirm this is the intial search
        .then(data => {
          github.activeBranch = data.repo.default_branch //Set branch type

          //Search repo
          ui.showToolbar()
          ui.clearGallery()
          history = []
          github.getRepo(targetRepo)
            .then(data => {
              traverseRepo(data.repo)
              history.push(data.repo)
            }).catch((e) => {
              ui.showAlert('Repo not Found', 'alert alert-danger');
            })
        })

    }
    else {
      ui.showAlert('Invalid URL', 'alert alert-danger');
    }
  }

})

document.addEventListener('click', e => {
  // Folder view Toggle
  if (e.target == ui.folderToggle) {
    ui.toggleItem('.gallery__folder', 'folderToggle');
    return
  }

  // File view Toggle
  if (e.target == ui.fileToggle) {
    ui.toggleItem('.gallery__file', 'fileToggle');
    return
  }

  // Go back to previous directory
  if (e.target == ui.backBtn) {
    if (history.length > 1) {
      ui.clearGallery()
      history.pop()
      traverseRepo(history[history.length - 1]) //Pass Last element addition to history
    }
    return
  }

  // Clear Gallery
  if (e.target == ui.clearBtn) {
    ui.clearGallery()
    history = []
    return
  }

  // Close overlay when close button is clicked or clicking outside image
  if ((e.target == ui.overlayClose) || e.target.classList.contains('open')) {
    ui.closeOverlay()
    return
  }

  // Check items too see if they were clicked
  ui.items = document.querySelectorAll('.item > *')

  ui.items.forEach(item => {

    if (item.contains(e.target)) {

      //Check if item is a folder
      if (item.parentElement.classList.contains('gallery__folder')) {
        let url = item.parentElement.querySelector('input').value
        github.openDir(url).then(data => {
          ui.clearGallery()
          history.push(data.dir)
          traverseRepo(data.dir)
        })
      }
      else if (item.parentElement.classList.contains('gallery__image')) {
        // ui.openImage(item)
        ui.openOverlay(item.parentElement)
      }
      else if (item.parentElement.classList.contains('gallery__file')) {

        let url = item.parentElement.querySelector('input').value
        window.open(url)

      }
      return
    }
  })

})


// To Do

// Limit number of items on page - use generator/iterators
// scope the SVG classes and Ids - use symbols and generators