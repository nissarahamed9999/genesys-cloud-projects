variable "metric_name" {
  description = "Name of the external metric"
  type        = string
}

variable "metric_unit" {
  description = "Unit of the metric (Seconds, Percent, Number, Currency)"
  type        = string
}

variable "metric_enabled" {
  description = "Whether the metric is enabled"
  type        = bool
  default     = true
}

variable "metric_objective_type" {
  description = "Objective type (HigherIsBetter, LowerIsBetter, TargetArea)"
  type        = string
}

variable "metric_precision" {
  description = "Precision for the metric"
  type        = number
  default     = 0
}

variable "metric_description" {
  description = "Description of the metric"
  type        = string
  default     = ""
}

variable "metric_external_source" {
  description = "External source for the metric"
  type        = string
  default     = ""
}