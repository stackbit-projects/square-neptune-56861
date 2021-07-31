import * as fs from "fs";
import fetch from "node-fetch";
import { extractFields, flattenFormValues } from "./utils/formUtils";
require("dotenv").config();

const { SITECORE_ORIGIN, SITECORE_PROXY_BASIC_AUTH } = process.env;

function writeToJson(data) {
  const JsonFile = "./functions_src/forms.json"
  fs.writeFile(JsonFile, JSON.stringify(data), function (err) {
    if (err) {
      throw err;
    }
    console.log(`Created ${JsonFile}`);
  });
}

async function parseData(retries=0) {
  // @TODO replace once /map.json includes formsdata
  let url = `${SITECORE_ORIGIN}/api/forms/getall`;

  console.log(`Fetching data for forms from: ${url}`)

  return fetch(url, {
    headers: {
      'Authorization': `Basic ${SITECORE_PROXY_BASIC_AUTH}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => data.map(form => ({
      id: form.Id,
      fields: flattenFormValues(extractFields(form.Fields))
    })))
    .catch(error => {
      // Could use environment variable here to define behaviour, e.g. throw error.
      console.log("Error retrieving forms data.");
      console.log(error);
      if (retries >= 10) {
        process.exit(1)
      }
      return parseData(retries + 1)
    })
}

async function parseForms() {
  console.log("Parsing forms, please wait...");

  const formsData = await parseData();
  writeToJson(formsData)
}

parseForms();
