const axios = require('axios');
let cachedToken = null;
let tokenExpiry = null;

async function getGenesysToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const response = await axios.post(process.env.GENESYS_TOKEN_URL, null, {
    auth: {
      username: process.env.GENESYS_CLIENT_ID,
      password: process.env.GENESYS_CLIENT_SECRET,
    },
  });

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;
  return cachedToken;
}

async function sendToGenesys(message) {
  const token = await getGenesysToken();
  const payload = {
    integrationId: process.env.GENESYS_INTEGRATION_ID,
    message: {
      type: 'Text',
      text: message.text?.body,
      from: message.from,
    },
  };

  await axios.post('https://api.mypurecloud.com/openmessaging/v1/messages', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

module.exports = { getGenesysToken, sendToGenesys };