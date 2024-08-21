variable image_tag {
    type = string
}

locals {
  container_environment = {
    CERTIFY_SBA_SAML_CALLBACK_URL        = "https://${local.env.domain_name}/auth/saml/callback"
    UCMS_ENV                             = local.env.ucms_env
    UCMS_LOG_TO_STDOUT                   = "true"
    UCMS_HOST                            = "${local.service_fqdn}-wfe"
    UCMS_ADMIN_ENV                       = "${local.env.ucms_env}_admin"
    # OKTA_OAUTH2_ISSUER                   = "https://dev-91055511.okta.com/oauth2/default"
    OKTA_OAUTH2_ISSUER                   = "https://login.test.mysba.ussba.io/oauth2/default"
    NEXTAUTH_URL                         = "https://ucp.demo.sba-one.net"
    NEXT_PRIVATE_LOCAL_WEBPACK           = "true" 
    NEXT_PUBLIC_API_URL                  = "https://ucms-internal-api.demo.sba-one.net/api/v1"
    UCP_ATLASSIAN_USERNAME               = "management@certify.sba.gov"
    NEXT_PUBLIC_LOGOUT_URL               = "https://login.test.mysba.ussba.io"
    NEXT_PUBLIC_POST_REDIRECT_URL        = "https://ucp.demo.sba-one.net/"
    HUBZONE_URL                          = "https://calculator.${local.env.domain_name}"
  }
  container_secrets_parameterstore = {
    OKTA_OAUTH2_CLIENT_ID     = "${terraform.workspace}/ucms/okta/OKTA_OAUTH2_CLIENT_ID"
    OKTA_OAUTH2_CLIENT_SECRET = "${terraform.workspace}/ucms/okta/OKTA_OAUTH2_CLIENT_SECRET"
    NEXTAUTH_SECRET           = "${terraform.workspace}/ucms/NEXTAUTH_SECRET"
    UCP_ATLASSIAN_API_KEY     = "${terraform.workspace}/ucms/UCP_ATLASSIAN_API_KEY"
  }
}


module "ucms-wfe" {
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

  family                 = "${terraform.workspace}-${local.env.service_name}-wfe"
  task_cpu               = local.env.task_cpu_ucms
  task_memory            = local.env.task_memory_ucms
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
  desired_capacity           = local.env.desired_capacity_ucms
  min_capacity               = local.env.desired_capacity_ucms
  max_capacity               = local.env.desired_capacity_ucms
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
  service_fqdn       = "${local.env.service_name}-wfe.${local.env.domain_name}"
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
      image        = "222484291001.dkr.ecr.${local.region}.amazonaws.com/ucms-wfe:${var.image_tag}"
      cpu          = 1024
      memory       = 3072
      environment  = [for k, v in local.container_environment : { name = k, value = v }]
      secrets      = [for k, v in local.container_secrets_parameterstore : { name = k, valueFrom = "${local.prefix_parameter_store}/${v}" }]
      portMappings = [{ containerPort = 3000 }]
    }
  ]
}