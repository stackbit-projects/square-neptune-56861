const fs = require("fs");
const fetch = require("node-fetch");
const js2xmlparser = require("js2xmlparser");
const https = require("https");
require("dotenv").config();

const { UNIFORM_API_URL } = process.env;
const { UNIFORM_API_SITENAME } = process.env;
const SITEMAP_HOST = process.env.URL;

https.globalAgent.maxSockets = 30;

async function downloadMap(retries = 0) {
  if (!UNIFORM_API_URL) {
    console.warn(
      `UNIFORM_API_URL environment variable is not defined, will skip.`
    );
    return;
  }

  if (!UNIFORM_API_SITENAME) {
    console.warn(
      `UNIFORM_API_SITENAME environment variable is not defined, will skip.`
    );
    return;
  }

  const mapService = `${UNIFORM_API_URL}/uniform/api/content/${UNIFORM_API_SITENAME}/map.json`;
  console.log("Downloading map from " + mapService);
  return fetch(mapService)
    .then(checkStatus)
    .then((res) => res.json())
    .then((map) => {
      console.log(`Downloaded map from remote server.`);
      //console.log({ map });
      processMap(map);
      return map;
    })
    .catch((error) => {
      console.log(`Error loading map.`);
      console.log(error);
      console.log(`Retrying...`)
      if (retries >= 10) {
        process.exit(1)
      }
      downloadMap(retries + 1)
    });
}

function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw Error(res.statusText);
  }
}

async function getPages(map) {
  let pages = [];
  pages.push({
    lastModified: map.lastModified,
    path: map.path,
  });

  let flatten = (children, extractChildren) =>
    Array.prototype.concat.apply(
      children,
      children.map((x) => flatten(extractChildren(x) || [], extractChildren))
    );

  let extractChildren = (x) => Object.values(x.children);

  let flatChildren = flatten(extractChildren(map), extractChildren).map(
    (x) => delete x.children && x
  );

  flatChildren.forEach((p) => {
    pages.push({
      lastModified: p.lastModified,
      path: p.path,
    });
  });

  console.log(`Extracted ${pages.length} page urls.`);

  return pages;
}

const isExcludedFromSiteMap = (page) => {
  return (
    page &&
    page.fields &&
    page.fields.navigationfilter &&
    page.fields.navigationfilter.indexOf(
      "{A0E7FF57-6994-4B09-AA21-104239628D5A}"
    ) >= 0
  );
};

async function processMap(map) {
  let urls = [];

  const pages = await getPages(map);

  await Promise.all(
    pages.map(async (page) => {
      const downloadedPage = await downloadPage(page);
      if (downloadedPage) urls.push(downloadedPage);
    })
  );

  const sitemapItems = {
    "@": {
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
    },
    url: urls,
  };

  const generatedSitemap = js2xmlparser.parse("urlset", sitemapItems, {
    declaration: {
      encoding: "utf-8",
      standalone: "no",
    },
  });

  writeSitemap("/sitemap.xml", generatedSitemap);
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function downloadPage(pageNode) {
  const pagePath =
    pageNode.path && pageNode.path !== "/" ? `${pageNode.path}.json` : ".json";

  const { lastModified } = pageNode;

  const pageService = `${UNIFORM_API_URL}/uniform/api/content/${UNIFORM_API_SITENAME}/page${pagePath}`;
  //console.log("Downloading page from " + pageService);

  const pageUrl = await fetch(pageService, {})
    .then(checkStatus)
    .then((res) => res.json())
    .then((page) => {
      //console.log(`Downloaded page from remote server:`);
      //console.log({ page });

      if (isExcludedFromSiteMap(page)) {
        console.log(
          `Page ${page.name} (id: ${page.id}) is excluded from sitemap`
        );
        return undefined;
      } else {
        return {
          loc: stripTrailingSlash(`${SITEMAP_HOST}${pageNode.path}`),
          lastmod: getDate(lastModified),
          changefreq: getChangeFrequency(page),
          priority: getPriority(page),
        };
      }
    })
    .catch((error) => {
      console.log(`Error loading page. ${pageService}`);
      console.log(error);
      return undefined;
    });

  await sleep(100);
  return pageUrl;
}

async function writeSitemap(filePath, fileContents) {
  const targetFilePath = `public/${filePath}`;
  console.log(`Creating ${targetFilePath} file`);

  fs.writeFile(targetFilePath, fileContents, function (err) {
    if (err) {
      throw err;
    }
    console.log(`Successfully ${targetFilePath} file!`);
  });
}

const getDate = (str) => {
  return str.substr(0, str.indexOf("T"));
};

const getChangeFrequency = (page) => {
  if (!page) {
    return "daily";
  }

  const changeFrequency = page.fields ? page.fields.changefrequency : undefined;
  if (!changeFrequency) {
    return "daily";
  }

  if (changeFrequency === "{D23B4654-53A5-4589-8B1B-5665A763D144}") {
    return "daily";
  }

  if (changeFrequency === "{3F00CE6E-67BD-4C6C-897F-4C2F36CD2135}") {
    return "always";
  }

  if (changeFrequency === "{1C2878D9-80A6-4760-B7EB-DBADE16AE8C8}") {
    return "do not include";
  }

  if (changeFrequency === "{35F9CE6F-2CA3-44D9-AB64-1D4971081F54}") {
    return "hourly";
  }

  if (changeFrequency === "{BDA510BA-F09A-48EA-A32E-8ED34BC6CFCF}") {
    return "monthly";
  }

  if (changeFrequency === "{DE6B0F71-40E3-4520-A836-B541366AF0B0}") {
    return "never";
  }

  if (changeFrequency === "{24B25142-A584-49BD-BADB-695D99C303CC}") {
    return "weekly";
  }

  if (changeFrequency === "{EFBE8A5E-1283-4A4D-A761-48175C9F9349}") {
    return "yearly";
  }

  return "daily";
};

const getPriority = (page) => {
  if (!page) {
    return 0.5;
  }

  const priority = page.fields ? page.fields.priority : undefined;
  if (!priority) {
    return 0.5;
  }

  if (priority === "{F9CAE3E8-4EC7-4E6B-8C0F-347D46F82ECA}") {
    return 0;
  }

  if (priority === "{4E279509-7847-4EF0-8507-EF3B564C46F5}") {
    return 0.2;
  }

  if (priority === "{4E2597ED-3498-4305-AA8E-7948B6426E7A}") {
    return 0.4;
  }

  if (priority === "{19F3E919-4991-495F-9207-E1DADFD06F54}") {
    return 0.5;
  }

  if (priority === "{FFCE6909-3209-4D46-B80E-1FD36130302F}") {
    return 0.6;
  }

  if (priority === "{FE6893DB-7C21-43FD-BFD9-3ABA91B256BE}") {
    return 0.8;
  }

  if (priority === "{F5FE29B6-3AA5-4648-8380-E67A5DC01D81}") {
    return 1.0;
  }

  return 0.5;
};

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};

downloadMap();
