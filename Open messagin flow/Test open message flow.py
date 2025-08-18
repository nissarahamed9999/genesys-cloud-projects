from PureCloudPlatformClientV2 import Configuration, ApiClient, ConversationsApi, PureCloudRegionHosts
from PureCloudPlatformClientV2.rest import ApiException

# Genesys Cloud credentials
CLIENT_ID = ''
CLIENT_SECRET = ''
INTEGRATION_ID = ''

# ✅ Step 1: Set region host as string
# Corrected line: Access the string value of the Enum
region_url = PureCloudRegionHosts.us_east_1.value  # returns 'https://api.mypurecloud.com'

# ✅ Step 2: Configure API client with correct host
configuration = Configuration()
configuration.host = region_url

# ✅ Step 3: Create API client and authenticate
api_client = ApiClient(configuration)
try:
    # Authenticate using client credentials
    api_client.get_client_credentials_token(CLIENT_ID, CLIENT_SECRET)
    print("✅ Authentication successful!")
except ApiException as e:
    print("❌ Exception when authenticating:", e.body)
    exit()

# ✅ Step 4: Set access token
configuration.access_token = api_client.configuration.access_token

# ✅ Step 5: Create Conversations API instance
conversations_api = ConversationsApi(api_client)

# ✅ Step 6: Prepare message payload
message_data = {
    "type": "Text",
    "text": "Hello from Python!",
    "from": {
        "id": "",
        "idType": "phone",
        "displayName": ""
    },
    "to": {
        "id": INTEGRATION_ID,
        "idType": "integration"
    }
}

# ✅ Step 7: Send message
try:
    response = conversations_api.post_conversation_message_inbound_open_message(INTEGRATION_ID, message_data)
    print("✅ Message sent! Conversation ID:", response.id)
except ApiException as e:
    print("❌ Exception when sending message:", e.body)
