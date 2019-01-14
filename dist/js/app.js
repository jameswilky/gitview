//Init Github
const github = new Github

//Init UI
const ui = new UI;

let PATH;


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
          ui.showImage(imgURL)
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

      //Display image of a folder in the nav bar with a link that will be passed to
      // the openDir function
    }


    //   // Open folder
    //   const url = file.url
    //   if (count < limit) {
    //     github.openDir(url)
    //       .then(data => {
    //         //recursively call function untill no directories left
    //         // console.log('called recursively')
    //         // traverseRepo(data.dir)
    //       })
    //       .catch(err => {
    //         console.log("Error Found", err)
    //       })
    //     count += 1

    //   }
    //   else {
    //     console.log("Custom Limit Reached")
    //     locked = true;
    //   }
    // }
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
      github.getRepo(targetRepo)
        .then(data => {
          traverseRepo(data.repo)
        })
    }
  }


  document.addEventListener('click', e => {
    let folderToggleBtn = document.querySelector('.folderToggle');

    if (e.target == folderToggleBtn) {
      ui.toggleFolder(folderToggleBtn);
    }

    let folders = document.querySelectorAll('.folder > *')

    folders.forEach(folder => {
      if (e.target == folder) {
        let url = folder.parentElement.querySelector('input').value
        github.openDir(url).then(data => {
          ui.clearGallery()
          traverseRepo(data.dir)
        })
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