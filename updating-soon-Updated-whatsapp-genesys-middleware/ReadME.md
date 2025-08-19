# WhatsApp ↔ Genesys Cloud Middleware

This Node.js middleware bridges WhatsApp Business Cloud API with Genesys Cloud Open Messaging. It securely routes inbound WhatsApp messages to Genesys and delivers outbound agent replies back to WhatsApp.

---

## 🚀 Features

- ✅ Webhook verification for WhatsApp
- 🔁 Inbound message routing to Genesys Cloud
- 📤 Outbound message delivery from Genesys to WhatsApp
- 🔐 HMAC signature validation for secure communication
- 🧠 OAuth token caching for Genesys
- 🧪 Token debug endpoint for WhatsApp

Install dependencies
npm install

API Endpoints
| Method | Endpoint | Description | 
| GET | /whatsapp/inbound | WhatsApp webhook verification | 
| POST | /whatsapp/inbound | Receives inbound WhatsApp messages | 
| POST | /genesys/outbound | Receives outbound messages from Genesys | 
| GET | /whatsapp/debug-token | Validates WhatsApp token status | 


🔐 Security
- All inbound Genesys messages are verified using HMAC SHA-256 signatures.
- OAuth tokens for Genesys are cached and refreshed automatically.
- WhatsApp token expiry is detected and logged for manual update.


🧪 Testing
Use ngrok to expose your local server:
node server.js
ngrok http 3000


Set the public ngrok URL as your webhook endpoint in Meta and Genesys.


📦 Deployment
You can deploy this middleware on:
- AWS Lambda (via Express adapter)
- Azure Functions
- Heroku / Render / Railway
- Docker container