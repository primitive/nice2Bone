// siteConfig.js

const DEFAULT_API_URL = "https://nice2b.me/wp-json/wp/v2/";

const getSafeApiUrl = () => {
  const raw = process.env.REACT_APP_API_URL;

  // Return fallback if it's missing, empty, or explicitly 'undefined' or 'null'
  if (
    !raw ||
    raw === "undefined" ||
    raw === "null" ||
    raw.trim() === ""
  ) {
    return DEFAULT_API_URL;
  }

  return raw;
};

const siteConfig = {
  apiURL: getSafeApiUrl(),
  siteName: "Nice2B",
  version: "2025.0.0",
  theme: "dark",
  enableSmartTags: true,
  apiTimeout: 10000,
  gaTrackingId: process.env.REACT_APP_GA_TRACKING_ID || null,
};

export default siteConfig;
