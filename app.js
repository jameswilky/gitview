//Init Github
const github = new Github
//Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Testing URL
// https://github.com/Gethe/wow-ui-textures

const traverseRepo = function (repo) {
  let limit = 5
  let count = 0;
  repo.forEach(file => {
    if (file.type == "file") {
      // Display file 
    }
    else if (file.type == "dir") {
      // Open folder
      console.log(file)
      const url = file.url
      if (count < limit) {
        github.openDir(url)
          .then(data => {
            //recursively call function untill no directories left
            // console.log('called recursively')
            // traverseRepo(data.dir)
          })
          .catch(err => {
            console.log("Error Found", err)
          })
        count += 1

      }
      else {
        console.log("Custom Limit Reached")
      }


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