const request = require('request');
const fs = require('fs');
const GITHUB_USER = "adriandgr";
let GITHUB_TOKEN;

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };
  console.log(options);

  request(options, function (error, response, body) {
    // Do more stuff with 'body' here
    console.log('Response Status Code:', response.statusCode);
    var records = JSON.parse(body);
    cb(error, records);

  })
  .on('error', function (err) {
    throw err;
  });
}


function getApiToken(path) {
  fs.readFile(path, function (err, data) {
    GITHUB_TOKEN = data.toString();
    console.log(GITHUB_TOKEN);
    getRepoContributors("jquery", "jquery", function(err, result) {
      console.log("Errors:", err);
      console.log("Result:", result);
      for (entry of result) {
        console.log(entry.avatar_url);
      }

    });
  });
}

getApiToken("./token.md");




