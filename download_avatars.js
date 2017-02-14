const request = require('request');
const fs = require('fs');
const GITHUB_USER = "adriandgr";
let GITHUB_TOKEN;


function getApiToken(path) {
  fs.readFile(path, function (err, data) {
    GITHUB_TOKEN = data.toString();
    console.log(GITHUB_TOKEN);
    getRepoContributors("jquery", "jquery", function(err, result) {
      console.log("Errors:", err);
      console.log("Result:", result);
    });
  });
}

getApiToken("./token.md");



function getRepoContributors(repoOwner, repoName, cb) {
  // ...

  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  console.log(requestURL);
}

