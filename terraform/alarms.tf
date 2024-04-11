# resource "aws_cloudwatch_metric_alarm" "rails_cpu" {
#   alarm_name          = "${terraform.workspace}-${local.env.service_name}-cpu-high"
#   comparison_operator = "GreaterThanThreshold"
#   evaluation_periods  = 5 #consecutive failures before reporting
#   metric_name         = "CPUUtilization"
#   namespace           = "AWS/ECS"
#   period              = 300 #seconds per period
#   datapoints_to_alarm = 5

#   statistic = "Average"
#   threshold = 80 #% cpu usage limit for failing

#   alarm_description = "${terraform.workspace} ${local.env.service_name} CPU utilization over 80% for the last 25 minutes"
#   alarm_actions     = [local.sns_alarms.red]
#   ok_actions        = [local.sns_alarms.green]

#   dimensions = {
#     ClusterName = data.aws_ecs_cluster.selected.cluster_name
#     ServiceName = module.rails.service.name
#   }
# }

# resource "aws_cloudwatch_metric_alarm" "rails_memory" {
#   alarm_name          = "${terraform.workspace}-${local.env.service_name}-memory-high"
#   comparison_operator = "GreaterThanThreshold"
#   evaluation_periods  = 5
#   metric_name         = "MemoryUtilization"
#   namespace           = "AWS/ECS"
#   period              = 300 #seconds per period
#   datapoints_to_alarm = 5

#   statistic = "Average"
#   threshold = 80 #% cpu usage limit for failing

#   alarm_description = "${terraform.workspace} ${local.env.service_name} Memory utilization over 80% for the last 25 minutes"
#   alarm_actions     = [local.sns_alarms.red]
#   ok_actions        = [local.sns_alarms.green]

#   dimensions = {
#     ClusterName = data.aws_ecs_cluster.selected.cluster_name
#     ServiceName = module.rails.service.name
#   }
# }

# resource "aws_cloudwatch_metric_alarm" "cron_cpu" {
#   alarm_name          = "${terraform.workspace}-${local.env.service_name}-cron-cpu-high"
#   comparison_operator = "GreaterThanThreshold"
#   evaluation_periods  = 5 #consecutive failures before reporting
#   metric_name         = "CPUUtilization"
#   namespace           = "AWS/ECS"
#   period              = 300 #seconds per period
#   datapoints_to_alarm = 5

#   statistic = "Average"
#   threshold = 80 #% cpu usage limit for failing

#   alarm_description = "${terraform.workspace} ${local.env.service_name} CPU utilization over 80% for the last 25 minutes"
#   alarm_actions     = [local.sns_alarms.red]
#   ok_actions        = [local.sns_alarms.green]

#   dimensions = {
#     ClusterName = data.aws_ecs_cluster.selected.cluster_name
#     ServiceName = aws_ecs_service.cron.name
#   }
# }

# resource "aws_cloudwatch_metric_alarm" "cron_memory" {
#   alarm_name          = "${terraform.workspace}-${local.env.service_name}-cron-memory-high"
#   comparison_operator = "GreaterThanThreshold"
#   evaluation_periods  = 5
#   metric_name         = "MemoryUtilization"
#   namespace           = "AWS/ECS"
#   period              = 300 #seconds per period
#   datapoints_to_alarm = 5

#   statistic = "Average"
#   threshold = 80 #% cpu usage limit for failing

#   alarm_description = "${terraform.workspace} ${local.env.service_name} Memory utilization over 80% for the last 25 minutes"
#   alarm_actions     = [local.sns_alarms.red]
#   ok_actions        = [local.sns_alarms.green]

#   dimensions = {
#     ClusterName = data.aws_ecs_cluster.selected.cluster_name
#     ServiceName = aws_ecs_service.cron.name
#   }
# }

# # Alarm(s) for CLAMAV
# # resource "aws_cloudwatch_log_metric_filter" "clamav_virus_scan" {
# #   name           = "clamav-virus-scan"
# #   pattern        = "\"Problem encountered while fetching Document from S3 during virus scan\""
# #   log_group_name = "/ecs/${terraform.workspace}/${local.env.service_name}"

# #   metric_transformation {
# #     name          = "clamav-virus-scan"
# #     namespace     = "${terraform.workspace}/sba-app/clamav"
# #     unit          = "Count"
# #     value         = "1"
# #     default_value = "0"
# #   }
# # }

# # resource "aws_cloudwatch_metric_alarm" "clamav_virus_scan" {
# #   actions_enabled = true

# #   alarm_actions             = [local.sns_alarms.red]
# #   ok_actions                = []
# #   insufficient_data_actions = []

# #   alarm_name        = "${terraform.workspace}-clamav-virus-scan"
# #   alarm_description = <<EOF
# # The ${terraform.workspace}-clamav or ${terraform.workspace}-whenever container(s) are failing to scan documents in the sba-docs-${terraform.workspace} s3 bucket.

# # Possible issues:
# # - One or more files do not exist with the given object key when attempting to fetch documents from the s3 bucket
# # - The ${terraform.workspace}-clamav task local database is failing to update
# # - The container may simply need to be rolled back to a prior version or rebuilt due to the compute architecutre (eg. arm, x86_x64) or corruption
# # - The sba-docs-${terraform.workspace} s3 bucket permissions may need to be adjusted
# # - The IAM role attached to the ${terraform.workspace}-clamav container may need to be adjusted

# # What to check:
# # - Use CloudWatch Insights to filter the @message field in the log-group /ecs/${terraform.workspace}/${local.env.service_name}
# # - Determine if the file(s) in question exist in the bucket at the path suggested in the logs, missing a file extension, or contain an invalid character

# # Insights filters:
# # - Problem encountered while fetching Document from S3 during virus scan
# # EOF

# #   comparison_operator = "GreaterThanThreshold"
# #   datapoints_to_alarm = 1
# #   dimensions          = {}
# #   evaluation_periods  = 1
# #   metric_name         = aws_cloudwatch_log_metric_filter.clamav_virus_scan.metric_transformation[0].name
# #   namespace           = aws_cloudwatch_log_metric_filter.clamav_virus_scan.metric_transformation[0].namespace
# #   period              = 300
# #   statistic           = "Sum"
# #   threshold           = 1
# #   treat_missing_data  = "missing"
# # }

# resource "aws_cloudwatch_metric_alarm" "thrash" {
#   alarm_name        = "${terraform.workspace}-${local.env.service_name}-thrashing"
#   alarm_description = <<EOF
# The ECS service ${terraform.workspace}-${local.env.service_name} container(s) appear to be thrashing.

# Possible issues:
# - The service healthcheck is failing
# - The service is crashing before reaching a steady state

# What to check:
# - Container Service Event Log
# - CloudWatch Logs for indicators like memory or connectivity issues

# Remediation:
# - Manually roll the service back to a prior image using Terraform
# EOF

#   alarm_actions = [local.sns_alarms.red]
#   ok_actions    = []

#   comparison_operator = "GreaterThanOrEqualToThreshold"
#   evaluation_periods  = 3
#   threshold           = 1

#   metric_query {
#     id          = "thrash"
#     expression  = "IF(CEIL(dt) - FLOOR(rt), 1, 0) AND CEIL(dc) > 1"
#     label       = "Thrashing"
#     return_data = true
#   }

#   metric_query {
#     id = "dt"
#     metric {
#       metric_name = "DesiredTaskCount"
#       namespace   = "ECS/ContainerInsights"
#       period      = 300
#       stat        = "Maximum"
#       dimensions = {
#         ServiceName = module.rails.service.name
#         ClusterName = data.aws_ecs_cluster.selected.cluster_name
#       }
#     }
#   }

#   metric_query {
#     id = "rt"
#     metric {
#       metric_name = "RunningTaskCount"
#       namespace   = "ECS/ContainerInsights"
#       period      = 300
#       stat        = "Minimum"
#       dimensions = {
#         ServiceName = module.rails.service.name
#         ClusterName = data.aws_ecs_cluster.selected.cluster_name
#       }
#     }
#   }

#   metric_query {
#     id = "dc"
#     metric {
#       metric_name = "DeploymentCount"
#       namespace   = "ECS/ContainerInsights"
#       period      = 300
#       stat        = "Minimum"
#       dimensions = {
#         ServiceName = module.rails.service.name
#         ClusterName = data.aws_ecs_cluster.selected.cluster_name
#       }
#     }
#   }
# }
