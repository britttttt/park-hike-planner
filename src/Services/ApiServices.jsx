
const eBirdapiKey = import.meta.env.VITE_EBIRD_API_KEY;
const eBirdapiUrl = import.meta.env.VITE_EBIRD_API_URL;

// const OpenMeteoUrl = import.meta.env.VITE_OPENMET_API_URL;


export const GetNearbyBirds = (trail) => {

    
var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", `${eBirdapiKey}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'

};

return fetch(`${eBirdapiUrl}lat=${trail.lat}&lng=${trail.lng}&back=14&dist=5`, requestOptions)
  .then(response => response.json())
//   .then(result => console.log(result))
  .catch(error => console.log('error', error));
}



