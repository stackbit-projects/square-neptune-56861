const axios = require('axios')

function formatResult (items) {
  const formattedItems = items.map(item => {
    const payload = {
      id: item.Key,
      addressline1: item.Organisation || item.Property || item.Street,
      addressline2: item.Organisation ? `${item.Property ? `${item.Property}, ` : ''}${item.Street}`  : item.Street,
      addressline3: "",
      town: item.Town,
      county: item.OptionalCounty,
      country: item.Country,
      postcode: item.Postcode,
    }

    const addressline2 = !item.Organisation && !item.Property ? item.Locality :  payload.addressline2
    return {
      ...payload,
      addressline2,
      addressline3: addressline2 !== item.Locality ? item.Locality : "",
      label: `${payload.addressline1}, ${payload.addressline2}, ${payload.town}, ${payload.postcode}`
    }
  })

  return formattedItems
}

exports.handler = async function (event, context) {
  const postcode = event.queryStringParameters.postcode
  if (!postcode) {
    return {
      statusCode: 422,
      body: 'Must supply postcode'
    };
  }


  const apiURL = `http://pce.afd.co.uk/afddata.pce?Serial=${process.env.AFD_SERIAL}&Password=${process.env.AFD_PASSWORD}&Data=Address&Task=FastFind&Fields=standard&Format=json&Lookup=`

  return axios.get(`${apiURL}${postcode}`)
    .then(function ({data}) {
      let results = []
      if (Number(data.Result) >= 0) {
        results = formatResult(data.Item)
      }
      return {
        statusCode: 200,
        body: JSON.stringify(results),
      };
    })
    .catch(function (error) {
      return {
        statusCode: 500,
        body: error
      };
    });
};
