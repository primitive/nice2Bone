// siteConfig.js

const DEFAULT_SITE_URL = "https://nice2b.me/";
const DEFAULT_WP_API_URL = "https://nice2b.me/wp-json/wp/v2/";
const DEFAULT_BEDROCK_API_URL = "https://nice2b.me/wp-json/bedrock/v1/";

const getSafeSiteUrl = () => {
  const raw = process.env.VITE_SITE_URL;
  // Return fallback if it's missing, empty, or explicitly 'undefined' or 'null'
  if (
    !raw ||
    raw === "undefined" ||
    raw === "null" ||
    raw.trim() === ""
  ) {
    return DEFAULT_SITE_URL;
  }

  return raw;
};
const getSafeWPApiUrl = () => {
  const raw = process.env.VITE_API_URL;
  // Return fallback if it's missing, empty, or explicitly 'undefined' or 'null'
  if (
    !raw ||
    raw === "undefined" ||
    raw === "null" ||
    raw.trim() === ""
  ) {
    return DEFAULT_WP_API_URL;
  }

  return raw;
};
const getSafeBedrockApiUrl = () => {
  const raw = process.env.VITE_BEDROCK_API_URL;
  // Return fallback if it's missing, empty, or explicitly 'undefined' or 'null'
  if (
    !raw ||
    raw === "undefined" ||
    raw === "null" ||
    raw.trim() === ""
  ) {
    return DEFAULT_BEDROCK_API_URL;
  }

  return raw;
};

const siteConfig = {
  //siteURL: getVar(["VITE_SITE_URL"], DEFAULT_SITE_URL),
  //apiURL:  getVar(["VITE_API_URL"], DEFAULT_API_URL),
  //apiBedrockURL: getVar(["VITE_API_URL"], DEFAULT_API_URL),
  siteURL: getSafeSiteUrl(),
  apiURL: getSafeWPApiUrl(),
  apiBedrockURL: getSafeBedrockApiUrl(),
  siteName: "Nice 2B",
  description: "• ❦ • ❧  the living notebook of a phantom scribbler  • ❧ •",
  version: "2025.0.0",
  theme: "dark",
  enableSmartTags: true,
  apiTimeout: 10000,
  basePath: "/",
  gaTrackingId: process.env.VITE_GA_TRACKING_ID || null,
  siteBrandLink: "/",
  postsHeader: "Posts & Articles",
  postsPreloadText: "Thinking, stand back...",
  postsNoneText: "No matching posts",
  postTaxPreloadText: "I like blinking, I do...",
  postsPerPage: 12,
  unused: "A curious mix of jokes, philosophy, and digital thought",
  unused2: "Did I tell you the one about...",
  jokesHeader: "Jokes",
};

export default siteConfig;
