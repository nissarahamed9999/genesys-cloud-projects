resource "genesyscloud_integration_action" "action-3" {
  name           = var.action_name
  category       = var.action_category
  integration_id = var.integration_id

  contract_input = jsonencode({
    type       = "object"
    properties = {
      metricId = { type = "string" }
      value    = { type = "number" }
    }
    required = ["metricId", "value"]
  })

  contract_output = jsonencode({
    type       = "object"
    properties = {
      status = { type = "string" }
    }
    required = ["status"]
  })

  config_request {
    request_type         = "POST"
    request_url_template = "https://your-api-endpoint.com/update-metric"
    request_template     = jsonencode({
      metricId = var.metricId
      value    = var.value
    })
    headers = {
      Content-Type = "application/json"
    }
  }

  config_response {
    success_template = jsonencode({
      status = "ok"
    })
  }
}