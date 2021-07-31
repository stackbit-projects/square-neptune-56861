# Getting started

Run `yarn`.

> **Note** that the postinstall script may not execute at the end of yarn, so you may have to run `yarn postinstall` once manually. This will copy the contents of the `/lib` folder with uniformdev packages to `node_modules/`.

## Local Development
1. make copy of `.env.dev`, name it `.env`, the sample file is pre-populated
1. `yarn start`
1.  visit `http://localhost:3000`

## Local export
1. make copy of `.env.export`, name it `.env`
1. `yarn export`
1. The site will be exported to the `./out` folder.
1. Run any static server on it `npx serve out` for example.
1. The site should be able to serve statically now.

## Uniform endpoints

The following ngrok tunnel is configured for the PoC: `http://tempsitecoreguidedogs.trafficmanager.net`. This can be changed in the .env file to point to a custom container. The sitename in the .ENV needs to be suffixed with "preview". E.g. "guidedogsdotorgpreview".

### Map Service
The role of Uniform Map Service is to return the hierarchy of all the pages in scope for a given site.

Endpoint: `/uniform/api/content/<sitename>/map.json`

#### Map Service Parameters
Replace `<sitename>` with either of the following values depending on the context:
- guidedogsdotorg (for production export)
- guidedogsdotorgpreview (for development)

### Page Service
The role of Uniform Page Service is to serialize all the data (fields and attributes) of a given page including the components assigned to a given page along with their metadata.

`/uniform/api/content/<sitename>/page<page_path>.json`

#### Page Service Parameters
- replace `<sitename>` with either of the following values depending on the context:
    - guidedogsdotorg (for production export)
    - guidedogsdotorgpreview (for development)
- replace `<page_path>` with the path of the page you want to return, for example:
    - `/uniform/api/content/guidedogsdotorg/page.json` (for home page it's empty string, so `page.json`)
     - `/uniform/api/content/guidedogsdotorg/page/donate-now.json` (for `/donate-now` page)

Here is one of the components (called renderings in Sitecore terminology) serialized as a part of Page Service:

```JSON
{
    id: "{54FEF368-3158-40FF-BC91-02B37B7DE08A}",
    placeholder: "main",
    renderingId: "95597bcc-8ba4-48b5-a399-bfcbe40fc8fb",
    renderingPath: "/sitecore/layout/Renderings/Feature/GuideDogs/Guide Dogs Components/Primary Hero",
    componentName: "PrimaryHero",
    settings: {
        Caching: {},
        Conditions: "",
        DataSource: "{3D1B565F-6DFD-42C5-9BE5-D6C3F6FD295D}",
        MultiVariateTest: "",
        Parameters: "GridParameters=%7B62BDED33-7AB9-48C0-BB73-9C353D884FCC%7D&FieldNames=%7B3CCD423F-E029-48EA-9053-3392817CB4DE%7D&Styles&Reset Caching Options&RenderingIdentifier&DynamicPlaceholderId=21",
        Placeholder: "main",
        Rules: false,
        PersonalizationTest: ""
    }
...
```

### Item Service
The role of the Uniform Item Service is to serialize a given Sitecore item, which is used when you convert renderings from MVC to React, for example, and the newly built components needs JSON data, not HTML from Sitecore.

`/uniform/api/content/guidedogsdotorg/item/<item_id>`

#### Item Service Parameters

- `item_id` needs to be replaced with the guid of a Sitecore item. 

For example, we can use the `DataSource` value of `PrimaryHero` object from the Page Service output above:
`/uniform/api/content/guidedogsdotorg/item/{3D1B565F-6DFD-42C5-9BE5-D6C3F6FD295D}`

The output object will be injected as `props.renderingContext.item` for the `PrimaryHero` react component:

```json
{
    children: { },
    fields: {
        herotitle: "We&#39;re here to help children like Nell",
        heroimage: {
        vspace: "",
        hspace: "",
        width: "2000",
        height: "560",
        class: "",
        mediaid: "2d2a98bf-c32c-478c-a3ee-a824d18bee74",
        alt: "Nell touches tape as she walks along wall with her cane",
        url: "/-/media/Project/GuideDogs/GuideDogsDotOrg/Images/Aug-Brand-2020/Nell-walks-along-with-hand-to-wall.jpg"
        },
        herosummarycopy: "For children with sight loss and their parents, early intervention from Guide Dogs is life changing.",
        heroctabuttonlink: {
        anchor: "",
        class: "",
        id: "471057dd-dd6e-4249-ae4b-aa5dd76a7f51",
        linktype: "internal",
        text: "Support for children and families",
        url: "/getting-support/help-for-children-and-families",
        target: ""
    },
    herofocalpoint: "63% 41%",
    _lang: "en",
    _rev: "32a51115-47e2-4902-81b6-d21832e33a27"
    },
    name: "homepage hero",
    id: "3d1b565f-6dfd-42c5-9be5-d6c3f6fd295d",
    template: "Primary Hero"
}
```

#### Accessing the item object from props:

```js
export const Hero = (props) => {
  const { item } = props.renderingContext;
  const { fields } = item;
  const {
    herotitle,
    heroimage,
    herosummarycopy,
    heroctabuttonlink,
    herofocalpoint,
  } = fields;

  ... // add your render code here
```

### Html service
The role of Uniform Html Service is to render and return the html  MVC view / controller renderings used on the page.

`/uniform/api/content/<sitename>/html<page_path>.json`

#### Parameters
- replace `<sitename>` with either of the following values depending on the context:
    - guidedogsdotorg (for production export)
    - guidedogsdotorgpreview (for development)
- replace `<page_path>` with the path of the page you want to return, for example:
    - `/uniform/api/content/guidedogsdotorg/html.json` (for home page it's empty string, so `page.json`)
     - `/uniform/api/content/guidedogsdotorg/html/donate-now.json` (for `/donate-now` page)

### API caching
API caching allows to cache the output of Uniform APIs in Azure Blob Storage for faster access and to reduce the need to connect to the Sitecore instance from Netlify build worker.

If is enabled (it is disabled for the time being), accessing any of the APIs above will redirect to the Azure Blob Storage cached copy (it is by design).

In order to force re-population of cache, add the following query string at the end of either map, page or html service:
`?blob=regenerate&uniform_token=12345`, for example: `http://tempsitecoreguidedogs.trafficmanager.net/uniform/api/content/guidedogsdotorgpreview/html.json?blob=regenerate&uniform_token=12345`

### Troubleshooting
If an error occurs with the message: `Error: resolve-url-loader: CSS error`, open `node_modules/resolve-url-loader/index.js`. Under `var options` change `removeCR` from `"false"` to `"true"`.

