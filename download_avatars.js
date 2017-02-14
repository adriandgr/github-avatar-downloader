const fs = require('fs');
const request = require('request');
const getRepoContributors = require('./getRepoContributors');
let owner = process.argv[2];
let repo = process.argv[3];
const filepath = './avatars/';



function downloadImageByURL(url, gitUser) {
  request.get(url)
         .on('error', (err) => { throw err; })
         .pipe(fs.createWriteStream(filepath + gitUser + '.jpg'))
         .on('error', (response) => {
            if (response.code === 'ENOENT'){
              console.log('directory', filepath, 'does not exist!');
              // throw response;
              //fs.mkdir(filepath)
            }
          })
         .on('finish', (response) => console.log('Download complete! (' + arguments[1] + ')'));
}

function downloadAvatars() {
  if (!fs.existsSync(filepath)){
    console.log('WARNING: directory', filepath, 'does not exist. Creating it interactively. \n')
        fs.mkdir(filepath);
      }
  if (owner && repo) {
    getRepoContributors(owner, repo, (err, result) => {

      for (entry of result) {
        downloadImageByURL(entry.avatar_url, entry.login);
      }
    });
  } else {
    console.log('Usage: \n $ node download_avatars.js <owner> <repo>');
  }
}

downloadAvatars();




