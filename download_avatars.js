const fs = require('fs');
const request = require('request');
const getRepoContributors = require('./getRepoContributors');
let GITHUB_TOKEN;


function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code:', response.statusCode);
         console.log('Content-type:', response.headers['content-type'])
         console.log('Downloading image...');
       })
       .pipe(fs.createWriteStream('./avatars/'+ filePath + '.jpg'))
       .on('finish', function (response) {
        console.log('Download complete!');
       });
}

function getApiToken(path) {
  fs.readFile(path, function (err, data) {
    GITHUB_TOKEN = data.toString();

    getRepoContributors("jquery", "jquery", GITHUB_TOKEN, function(err, result) {
      for (entry of result) {
        downloadImageByURL(entry.avatar_url, entry.login);

      }
    });
  });
}

getApiToken("./token.md");




