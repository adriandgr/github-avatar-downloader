const request = require('request');
const GITHUB_USER = "adriandgr";

function getRepoContributors(repoOwner, repoName, gitToken, cb) {
  // ...
  let requestURL = `https://${GITHUB_USER}:${gitToken}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    // Do more stuff with 'body' here
    console.log('Response Status Code:', response.statusCode, '\n');
    var records = JSON.parse(body);
    cb(error, records);

  })
  .on('error', function (err) {
    throw err;
  });
}

module.exports = getRepoContributors;