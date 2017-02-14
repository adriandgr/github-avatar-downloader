const fs = require('fs');
const request = require('request');
const getRepoContributors = require('./getRepoContributors');
let GITHUB_TOKEN;
let owner = process.argv[2];
let repo = process.argv[3];


function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', (err) => { throw err; })
         .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'))
         .on('finish', (response) => console.log('Download complete! (' + arguments[1] + ')'));
}

function getApiToken(path) {
  fs.readFile(path, function (err, data) {
    GITHUB_TOKEN = data.toString();
    if (owner && repo) {
      getRepoContributors(owner, repo, GITHUB_TOKEN, (err, result) => {
        for (entry of result) {
          downloadImageByURL(entry.avatar_url, entry.login);
        }
      });
    } else {
      console.log('Usage: \n $ node download_avatars.js <owner> <repo>');
    }
  });
}

getApiToken("./token.md");




