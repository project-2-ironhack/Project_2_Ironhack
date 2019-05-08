const axios = require('axios');

const http = axios.create({
  baseURL: 'https://apis.bbva.com',
  headers: {'accept': 'application/json'}
});

const authenticate = () => {
  return axios.post('https://connect.bbva.com/token?grant_type=client_credentials', null, {
      headers: {
        'authorization': `Basic ${process.env.BBVA_API}`
      }
    }
    ).then(res => res.data.access_token)
}

module.exports.getData = (dateRange, extraParam, zipcode) => {
  return authenticate()
    .then(accessToken => {
      return http.get(`/paystats_sbx/4/zipcodes/${zipcode}/origin_distribution`, {
        params: {
          'origin_type' : 'zipcodes',
          'min_date' : dateRange.min,
          'max_date' : dateRange.max,
          'expand': extraParam
        },
        headers: {
          'authorization': `jwt ${accessToken}`,
        }
      })
    }).then(res => res.data.data);
}
