variable image_tag {
    type = string
}

locals {
  container_environment = {
    CERTIFY_SBA_SAML_CALLBACK_URL        = "https://${local.env.domain_name}/auth/saml/callback"
    UCP_ENV                             = local.env.ucp_env
    UCP_LOG_TO_STDOUT                   = "true"
    UCP_HOST                            = "${local.service_fqdn}-wfe"
    UCP_ADMIN_ENV                       = "${local.env.ucp_env}_admin"
    OKTA_OAUTH2_ISSUER                   = local.env.okta_oauth2_issuer
    NEXTAUTH_URL                         = local.env.next_base_url
    NEXT_PRIVATE_LOCAL_WEBPACK           = "true" 
    NEXT_PUBLIC_API_URL                  = "https://ucp-internal-api.${local.env.domain_name}/api/v1"
    UCP_ATLASSIAN_USERNAME               = "management@certify.sba.gov"
    NEXT_PUBLIC_LOGOUT_URL               = local.env.next_public_logout_url
    NEXT_PUBLIC_POST_REDIRECT_URL        = local.env.next_base_url
    HUBZONE_URL                          = "https://calculator.${local.env.domain_name}"
    NEXT_PUBLIC_HUBZONE_URL              = "https://calculator.${local.env.domain_name}"
    UCP_TRACKING_ID                      = local.env.ucp_tracking_id
    REDIS_HOST                           = local.env.redis_host
    NEXT_PUBLIC_RANDOM                   = local.env.next_public_random
    NEXT_PUBLIC_DEBUG                    = local.env.next_public_debug
    NEXT_PUBLIC_WS_LIVE_NOTIFICATIONS    = "ws://ucp-communication.${local.env.domain_name}/communication/v1/live-notifications/1"
  }
  container_secrets_parameterstore = {
    OKTA_OAUTH2_CLIENT_ID     = "${terraform.workspace}/ucp/okta/OKTA_OAUTH2_CLIENT_ID"
    OKTA_OAUTH2_CLIENT_SECRET = "${terraform.workspace}/ucp/okta/OKTA_OAUTH2_CLIENT_SECRET"
    NEXTAUTH_SECRET           = "${terraform.workspace}/ucp/NEXTAUTH_SECRET"
    UCP_ATLASSIAN_API_KEY     = "${terraform.workspace}/ucp/UCP_ATLASSIAN_API_KEY"
    COLLOPORTUS               = "${terraform.workspace}/ucp/colloportus"
  }
}


module "ucp-wfe" {
  source  = "USSBA/easy-fargate-service/aws"
  version = "~> 11.0"

  # cloudwatch logging
  log_group_name              = "/ecs/${terraform.workspace}/${local.env.service_name}-wfe"
  log_group_retention_in_days = 90

  # access logs
  # note: bucket permission may need to be adjusted
  # https://docs.aws.amazon.com/elasticloadbalancing/latest/wfe/load-balancer-access-logs.html#access-logging-bucket-permissions
  alb_log_bucket_name = local.env.log_bucket
  alb_log_prefix      = "alb/${local.env.service_name}-wfe/${terraform.workspace}"

  # Only needed if we use cloudfront
  cloudfront_header = {
    key   = "x-ussba-origin-token",
    value = nonsensitive(data.aws_ssm_parameter.origin_token.value)
  }

  family                 = "${terraform.workspace}-ucp-wfe"
  task_cpu               = local.env.task_cpu_ucp
  task_memory            = local.env.task_memory_ucp
  # task_policy_json       = data.aws_iam_policy_document.fargate.json
  enable_execute_command = true
  ipv6                   = true
  #alb_idle_timeout       = 60

  # Deployment
  enable_deployment_rollbacks        = true
  wait_for_steady_state              = true
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100

  # Scaling and health
  desired_capacity           = local.env.desired_capacity_ucp
  min_capacity               = local.env.desired_capacity_ucp
  max_capacity               = local.env.desired_capacity_ucp
  scaling_metric             = local.env.scaling_metric
  scaling_threshold          = local.env.scaling_threshold
  scheduled_actions          = try(local.env.scheduled_actions, [])
  scheduled_actions_timezone = try(local.env.scheduled_actions_timezone, "UTC")
  health_check_path          = "/health/"
  # Unhealthy threshold is set for 10 (default). This container takes 5
  # minutes to run its precompile asset task and does not respond to
  # health checks until this is complete.
  health_check_interval            = 60
  health_check_timeout             = 30
  health_check_healthy_threshold   = 2
  health_check_unhealthy_threshold = 10

  # networking
  service_fqdn       = "ucp-wfe.${local.env.domain_name}"
  hosted_zone_id     = data.aws_route53_zone.selected.zone_id
  public_subnet_ids  = data.aws_subnets.public.ids
  private_subnet_ids = data.aws_subnets.private.ids
  vpc_id             = data.aws_vpc.selected.id
  certificate_arn    = data.aws_acm_certificate.selected.arn

  # container(s)
  cluster_name   = data.aws_ecs_cluster.selected.cluster_name
  container_port = "3000"
  container_definitions = [
    {
      name         = "wfeService"
      image        = "222484291001.dkr.ecr.${local.region}.amazonaws.com/ucp-wfe:${var.image_tag}"
      cpu          = 1024
      memory       = 3072
      environment  = [for k, v in local.container_environment : { name = k, value = v }]
      secrets      = [for k, v in local.container_secrets_parameterstore : { name = k, valueFrom = "${local.prefix_parameter_store}/${v}" }]
      portMappings = [{ containerPort = 3000 }]
    }
  ]
}