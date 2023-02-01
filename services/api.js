const axios = require('axios');

export function requeteGetDatas() {
    var configGetAll = {
      method: 'get',
      url: `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
      headers: {
        'Content-Type': 'application/json'
      }
  
    };
    return axios(configGetAll);
  }