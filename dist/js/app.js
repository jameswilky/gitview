//Init Github
const github = new Github

//Init UI
const ui = new UI;

let history;

// Search input
const searchUser = document.getElementById('searchUser');

// Testing URL
// https://github.com/Gethe/wow-ui-textures
const traverseRepo = function (repo) {
  repo.forEach(item => {
    let tokens = item.name.split('.')
    let fileType = tokens.slice(-1)[0]

    if (item.type == "file" && fileType == "PNG") { //use regex to get all case lower/upper types
      //if file file is an image
      github.openImage(item).then(data => {
        if (data.image.type == "image/png") { //check if is an iamge
          imgURL = URL.createObjectURL(data.image)
          ui.showImage(imgURL, item.name)
        }
      })
    }
    else if (item.type == "file") {
      //If item is a file but not a picture
      github.getFileIcon(fileType.toLowerCase()).then(data => {
        ui.showSVG(data.svg)
      })
      //Display sprite of a txt file
    }
    else if (item.type == "dir") {
      //If item is a folder
      ui.createFolder(item.name, item.url)
    }

  });
}

// Search input event listener
searchUser.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    // Get input text
    let targetRepo = e.target.value;
    targetRepo = "https://github.com/Gethe/wow-ui-textures"

    //Validate that format is correct
    let valid = true //temp

    if (valid) {
      ui.showToolbar()
      ui.clearGallery()
      history = []
      github.getRepo(targetRepo)
        .then(data => {
          traverseRepo(data.repo)
          history.push(data.repo)
        })
    }
  }



  document.addEventListener('click', e => {

    // Folder view Toggle
    if (e.target == ui.folderToggleBtn) {
      ui.toggleFolder();
      return
    }

    // Go back to previous directory
    if (e.target == ui.backBtn) {
      ui.clearGallery()
      history.pop()
      traverseRepo(history[history.length - 1]) //Pass Last element addition to history
      return
    }

    // Close ?
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
          })
        }
        else {
          ui.openOverlay(e.target)

        }
        return
      }
    })




  })

  // if (userText !== '') {
  //   // Make http call

  //   github.getUser(userText)
  //     .then(data => {
  //       if (data.profile.message == 'Not Found') {
  //         // Show alert
  //         ui.showAlert('User not Found', 'alert alert-danger');

  //       } else {
  //         // Show profile
  //         ui.showProfile(data.profile);
  //         ui.showRepos(data.repos)
  //       }
  //     })
  // }
  // else {
  //   //Clear profile
  //   ui.clearProfile();
  // }
})