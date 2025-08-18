const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const { sendToGenesys, getGenesysToken } = require('./utils/genesys');
const { sendToWhatsApp, verifyWhatsAppToken } = require('./utils/whatsapp');
const { verifySignature } = require('./utils/verifySignature');

const app = express();
app.use(bodyParser.json());

app.get('/whatsapp/inbound', verifyWhatsAppToken);

app.post('/whatsapp/inbound', async (req, res) => {
  const isValid = verifySignature(req);
  if (!isValid) return res.status(403).send('Invalid signature');

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (message) {
    await sendToGenesys(message);
  }
  res.sendStatus(200);
});

app.post('/genesys/outbound', async (req, res) => {
  const { message, to } = req.body;
  await sendToWhatsApp(to, message);
  res.sendStatus(200);
});

app.get('/whatsapp/debug-token', (req, res) => {
  res.json({ token: process.env.WHATSAPP_ACCESS_TOKEN });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Middleware running on port ${PORT}`));