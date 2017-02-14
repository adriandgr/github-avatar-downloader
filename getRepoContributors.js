const request = require('request');
const dotenv = require('dotenv').config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;

function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    console.log('Response Status Code:', response.statusCode, '\n');
    var records = JSON.parse(body);
    cb(error, records);
  })
  .on('error', function (err) {
    throw err;
  });
}

module.exports = getRepoContributors;