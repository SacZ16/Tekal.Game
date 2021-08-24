import { useState } from 'react';
import axios from 'axios';

const GeoLocalitation = () => {
    const [localitation, setlocalitation] = useState({})
    const geolocationCity = async () => {
        if ("geolocation" in navigator && !localitation.length) {
            await navigator.geolocation.getCurrentPosition(async function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=un`)
                let filterResponse = await response.data
                console.log(filterResponse)
                setlocalitation({ city: filterResponse.city, country: filterResponse.countryName })
                return
            });
        }
    }
    if (!localitation.hasOwnProperty('city')) {
        geolocationCity()

    }
    if (!localitation.hasOwnProperty('city')) {
        setlocalitation({ city: '', country: '' })

    }

    return localitation
}

export default GeoLocalitation;