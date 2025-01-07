const API_DOMAIN = process.env.DEVELOPMENT
  ? process.env.API_URL_DEV
  : process.env.API_URL_PROD;
const API_VERSION = process.env.API_PREFIX;

const API_URL = `${API_DOMAIN}/${API_VERSION}`;

const GENERAL_VARIABLES = {
  apiDomain: API_DOMAIN,
  apiVersion: API_VERSION,
  apiUrl: API_URL,
};

export default GENERAL_VARIABLES;
