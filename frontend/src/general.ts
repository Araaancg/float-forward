
// API url
const API_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT
  ? process.env.NEXT_PUBLIC_API_URL_DEV
  : process.env.NEXT_PUBLIC_API_URL_PROD;
const API_VERSION = process.env.NEXT_PUBLIC_API_PREFIX;

const API_URL = `${API_DOMAIN}/${API_VERSION}`;

// External API keys
const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const GENERAL_VARIABLES = {
  apiDomain: API_DOMAIN,
  apiVersion: API_VERSION,
  apiUrl: API_URL,
  googleApiKey: GOOGLE_KEY
};

export default GENERAL_VARIABLES;
