//Init Github
const github = new Github

//Init UI
const ui = new UI;

let history = [];

// Search input
const searchUser = document.getElementById('searchUser');

// Testing URL
const traverseRepo = function (repo) {
  repo.forEach(item => {


    //Identify if string ends in .png/.jpg/.tif/.gif
    regex = /..*[.](png|jpg|tif|gif)$/i

    let isImage = regex.test(item.name)

    if (item.type == "file" && isImage) {
      //if file file is an image
      github.openImage(item).then(data => {
        console.log('opening image')
        console.log(data)
        if (data.image.type == "image/png") { //check if is an iamge
          imgURL = URL.createObjectURL(data.image)
          ui.showImage(imgURL, item.name)
        }
      })
    }
    else if (item.type == "file") {
      //If item is a file but not a picture
      let tokens = item.name.split('.')
      let fileType = tokens.slice(-1)[0]

      github.getFileIcon(fileType.toLowerCase()).then(data => {
        ui.showIcon(data.svg, item.name, item.html_url, 'file')
      })
      //Display sprite of a txt file
    }
    else if (item.type == "dir") {
      //If item is a folder
      ui.showIcon("folder", item.name, item.url, 'folder')
    }

  });
}

// Search input event listener
searchUser.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    // Get input text
    let targetRepo = e.target.value;
    // targetRepo = "https://github.com/Gethe/wow-ui-textures"

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
    ui.toggleItem('.folder', 'folderToggle');
    return
  }

  // File view Toggle
  else if (e.target == ui.fileToggle) {
    ui.toggleItem('.file', 'fileToggle');
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

  // Close overlay
  if (e.target == ui.overlayClose) {
    ui.closeOverlay()
    return
  }


  // Check items too see if they were clicked
  ui.items = document.querySelectorAll('.item > *')

  ui.items.forEach(item => {
    if (e.target == item) {
      //Check if item is a folder
      if (item.parentElement.classList.contains('folder')) {
        let url = item.parentElement.querySelector('input').value
        github.openDir(url).then(data => {
          ui.clearGallery()
          history.push(data.dir)
          traverseRepo(data.dir)
          console.log(data.dir)
        })
      }
      else if (item.parentElement.classList.contains('gallery-image')) {
        ui.openImage(item)
      }
      else if (item.parentElement.classList.contains('file')) {
        let url = item.querySelector('input').value
        window.open(url)

      }
      return
    }
  })

})


// media query event handler
if (matchMedia) {
  const mq = window.matchMedia("(min-width: 500px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}

// media query change
function WidthChange(mq) {
  let div = document.querySelector(".img-zoom-result")
  if (mq.matches) {
    // window width is at least 500px
    div.style.display = 'initial'
  } else {
    // window width is less than 500px
    div.style.display = 'none'

  }

}

document.addEventListener('mousemove', e => {
  let div = document.querySelector(".img-zoom-result")
  div.style.left = e.pageX + 'px'
  div.style.top = e.pageY + 'px'
})
