const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();

async function downloadFile(host, filePath, auth, retries) {
  console.log(`Will be downloading ${filePath} from host '${host}'`);

  headers = new fetch.Headers();
  if (auth) {
    console.log(`Requesting with basic authentication`);

    headers.set('Authorization', 'Basic ' + auth);
  }

  return fetch(`${host}/${filePath}`, {method:'GET', headers: headers})
    .then(checkStatus)
    .then((res) => res.text())
    .then((contents) => {
      console.log(`Downloaded ${filePath} from remote server. Length: ${contents.length}`);
      
      writeFile(filePath, contents);
      return contents;
    })
    .catch((error) => {
      console.log(`Error retrieving ${filePath}.`);
      console.log(error);
      console.log(`Retrying...`)
      if (retries >= 10) {
        process.exit(1)
      }
      downloadFile(host, filePath, auth, retries+1)
    });
}

function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw Error(res.statusText);
  }
}

async function writeFile(filePath, fileContents) {
  const targetFilePath = `public/${filePath}`;
  console.log(`Creating ${targetFilePath} file`);

  fs.writeFile(targetFilePath, fileContents, function (err) {
    if (err) {
      throw err;
    }
    console.log(`Successfully ${targetFilePath} file!`);
  });
}

if (process.argv) {
  const args = process.argv.slice(2);
  if (args && Array.isArray(args) && args.length > 1) {
    const envVarName = args[0];
    const filePath = args[1];
    const auth = (args.length > 2) ? process.env[args[2]] : null;

    //console.log({ envVarName, filePath });

    const host = process.env[envVarName];
    if (!host) {
      console.warn(
        `${envVarName} environment variable is not defined, will skip '${filePath}' file download.`
      );
      return;
    }

    if (!host) {
      console.warn(`${filePath} is undefined, will skip file download.`);
      return;
    }

    downloadFile(host, filePath, auth, 0);
  } else {
    console.warn("Bad args");
  }
}
