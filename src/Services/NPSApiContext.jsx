const NPSApiKey = import.meta.env.VITE_NPS_API_KEY;
const NPSApiUrl = import.meta.env.VITE_NPS_API_URL;
const NPSCampgroundsUrl = import.meta.env.VITE_NPS_CAMPGROUNDS_API_URL;

import { createContext, useContext } from "react";

const NPSApiContext = createContext();

// Helper function using .then()
const fetchFromApi = (url) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error;
    });
};

export const NPSApiProvider = ({ children }) => {
  const getAlerts = () => fetchFromApi(`${NPSApiUrl}${NPSApiKey}`);
  const getCampgrounds = () => fetchFromApi(`${NPSCampgroundsUrl}${NPSApiKey}`);

  return (
    <NPSApiContext.Provider value={{ getAlerts, getCampgrounds }}>
      {children}
    </NPSApiContext.Provider>
  );
};

export const useNPSApi = () => {
  const context = useContext(NPSApiContext);
  if (!context) {
    throw new Error("useNPSApi must be used within a NPSApiProvider");
  }
  return context;
};