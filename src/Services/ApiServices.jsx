
const eBirdapiKey = import.meta.env.VITE_EBIRD_API_KEY;
const eBirdapiUrl = import.meta.env.VITE_EBIRD_API_URL;
const NPSApiKey = import.meta.env.VITE_NPS_API_KEY;
const NPSApiUrl = import.meta.env.VITE_NPS_API_URL;
const NPSCampgroundsUrl =import.meta.env.VITE_NPS_CAMPGROUNDS_API_URL
const NuthatchApiKey = import.meta.env.VITE_NUTHATCH_API_KEY;

// const OpenMeteoUrl = import.meta.env.VITE_OPENMET_API_URL;


export const GetNearbyBirds = (trail) => {

    
var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", `${eBirdapiKey}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'

};

return fetch(`${eBirdapiUrl}lat=${trail.lat}&lng=${trail.lng}&back=30&dist=10`, requestOptions)
  .then(response => response.json())
//   .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

export const GetNearbyBirdImage = (bird) => {
  const encodedName = encodeURIComponent(bird.comName); // encode name properly for URL

  const myHeaders = new Headers();
  myHeaders.append("API-Key", "0245bfa6-5c9f-4076-9d75-f8fe35b36787");
  myHeaders.append("accept", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };





  return fetch(`https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=25&name=${encodedName}&hasImg=true`, requestOptions)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch image");
      return response.json();
    })
    .then(data => {
      if (data && data.results && data.results.length > 0) {
        return data.results[0].images?.[0]?.url ?? null; // Return first image URL
      }
      return null;
    })
    .catch(error => {
      console.error('Error fetching bird image:', error);
      return null;
    });
};






export const GetNPSAlerts = () => {

    return fetch(`${NPSApiUrl}${NPSApiKey}`).then((res) => res.json())
     .catch(error => console.log('error', error));

}

export const GetNPSCampgrounds = () => {

  return fetch(`${NPSCampgroundsUrl}${NPSApiKey}`).then((res) => res.json())
   .catch(error => console.log('error', error));
}