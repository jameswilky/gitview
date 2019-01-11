//Init Github
const github = new Github
//Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Testing URL
// https://github.com/Gethe/wow-ui-textures
let limit = 5
let count = 0;
let locked = false;
const traverseRepo = function (repo) {
  repo.forEach(item => {
    let tokens = item.name.split('.')
    let fileType = tokens.slice(-1)[0]

    if (item.type == "file" && fileType == "PNG") {
      //if file file is an image
      github.openImage(item).then(data => {
        if (data.image.type == "image/png") { //check if is an iamge
          imgURL = URL.createObjectURL(data.image)
          ui.showImage(imgURL)
        }
      })
    }

    //show folder image or file image like .txt etc determined by file.type
    // ui.showSprite(file)


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