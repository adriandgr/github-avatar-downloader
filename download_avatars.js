const fs = require('fs');
const getRepoContributors = require('./getRepoContributors');
let GITHUB_TOKEN;


function getApiToken(path) {
  fs.readFile(path, function (err, data) {
    GITHUB_TOKEN = data.toString();

    getRepoContributors("jquery", "jquery", GITHUB_TOKEN, function(err, result) {
      for (entry of result) {
        console.log(entry.avatar_url);
      }
    });
  });
}

getApiToken("./token.md");




