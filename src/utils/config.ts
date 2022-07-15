const AUTH = require('../../.credentials/auth-credentials.json');
const LOL = require('../../.credentials/lol-api.json');

export const AUTH_CREDENTIALS = {
  x_api_key: AUTH.x_api_key
};

export const LOL_API = {
  baseURL: LOL.baseURL,
  championsURL: LOL.championsURL
};