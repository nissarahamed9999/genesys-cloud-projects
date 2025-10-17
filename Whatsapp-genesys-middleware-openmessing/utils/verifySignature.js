const crypto = require('crypto');

function verifySignature(req) {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const expected = crypto
    .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
    .update(payload)
    .digest('hex');

  return signature === `sha256=${expected}`;
}

module.exports = { verifySignature };