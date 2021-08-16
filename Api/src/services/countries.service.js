const axios = require('axios').default;


const AskCountries = async () =>{
    let response = await axios.get('https://restcountries.eu/rest/v2/all')
    let filterResponse = await response.data.map(country => country.name);
    return filterResponse;
}


module.exports = {AskCountries}