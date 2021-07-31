const { pageNotFound } = require('./404.html.json');
const redirects = require('./redirects.json');
const { cleanFromUrl, getRedirectURL } = require('../lib/helpers/redirect-url-parser.js');


exports.handler = async function (event, context) {
  let path = cleanFromUrl(event.path);
  const parameters = Object.keys(event.queryStringParameters).map((param) => `${param}=${event.queryStringParameters[param]}`).join("&")

  if (parameters) {
    path = `${path}?${parameters}`
  }

  if (path.startsWith('/.netlify/')) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(redirects),
    };
  }

  const redirectValue = getRedirectURL(path, redirects)

  if (redirectValue) {
    return {
      statusCode: redirectValue.status,
      headers: {
        location: redirectValue.target,
      },
    };
  }

  return {
    statusCode: 404,
    headers: {
      "Content-Type": "text/html"
    },
    body: pageNotFound,
    isBase64Encoded: true,
  };

};
