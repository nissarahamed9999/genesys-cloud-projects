resource "genesyscloud_employeeperformance_externalmetrics_definitions" "externalmetrics_definition" {
  name                   = var.metric_name
  unit                   = var.metric_unit           # "Seconds", "Percent", "Number", or "Currency"
  enabled                = var.metric_enabled
  default_objective_type = var.metric_objective_type # "HigherIsBetter", "LowerIsBetter", or "TargetArea"
  precision              = var.metric_precision

  # Optional attributes
#   description            = var.metric_description
#   external_metric_source = var.metric_external_source
}