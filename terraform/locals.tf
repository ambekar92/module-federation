locals {
  region       = data.aws_region.current.name
  account_id   = data.aws_caller_identity.current.account_id
  account_name = contains(["stg", "prod"], terraform.workspace) ? "upper" : "lower"
  account_ids = {
    demo = "997577316207"
    stg  = "222484291001"
    prod = "222484291001"
  }
  # sns_alarms = {
  #   #green    = "arn:aws:sns:us-east-1:502235151991:alarm-green"
  #   #yellow   = "arn:aws:sns:us-east-1:502235151991:alarm-yellow"
  #   #red      = "arn:aws:sns:us-east-1:502235151991:alarm-red"
  #   #security = "arn:aws:sns:us-east-1:502235151991:alarm-security"
  #   green    = data.aws_sns_topic.alerts["green"].arn
  #   yellow   = data.aws_sns_topic.alerts["yellow"].arn
  #   red      = data.aws_sns_topic.alerts["red"].arn
  #   security = data.aws_sns_topic.alerts["security"].arn
  # }
  all = {
    default = {
      service_name      = "ucms"
      service_name_alt  = "ucms"
      # ecr_name_nginx    = "certify/sba-app-nginx"
      ucms_port        = "8080"
      task_cpu_ucms    = "4096"
      task_memory_ucms = "8192"
      log_bucket        = "${local.account_id}-us-east-1-logs"
      db_port           = "5432"

      # health_check_path         = "/activity"
      desired_capacity_ucms    = 1
      min_container_count_ucms = 1
      max_container_count_ucms = 1
      scaling_metric            = "memory"
      scaling_threshold         = "75"

      scheduled_actions          = []
      scheduled_actions_timezone = "America/New_York"

    }
    demo = {
      domain_name           = "demo.sba-one.net"
      cert_domain           = "sba-one.net"
      ucms_env              = "demo"
      max_sba_issuer        = "demo-certify-sba-gov"
      oai_id                = "E1PVFJGLUVYCEO" # This is only needed if we use cloudfront
      db_host               = "ucms-db.demo.sba-one.net"
      distribution_url      = "https://d3eivjwm5b8rit.cloudfront.net"
    }
    stg = {
      domain_name           = "stg.certify.sba.gov"
      cert_domain           = "certify.sba.gov"
      oai_id                = "E13BTMXKQCJ8EC" # This is only needed if we use cloudfront
      certs_bucket          = "298969701643-us-east-1-staging-certifications" # Not sure if this is needed
      distribution_url      = "https://d2ooza27avgm5e.cloudfront.net"

      desired_capacity_ucms    = 2
      min_container_count_ucms = 2
      max_container_count_ucms = 2
      ucms_env                 = "stage"
      db_host                  = "ucms-db.stg.certify.sba.gov" 

    }
    prod = {
      domain_name          = "certify.sba.gov"
      cert_domain          = "certify.sba.gov"
      oai_id               = "E1HEQ3JCZ916O8" # This is only needed if we use cloudfront
      certs_bucket         = "298969701643-us-east-1-prod-certifications"
      db_host              = "ucms-db.certify.sba.gov" 
      distribution_url     = "https://dzjorhrnuv7ld.cloudfront.net"

      desired_capacity_ucms    = 4
      min_container_count_ucms = 4
      max_container_count_ucms = 10
      ucms_env                 = "production"
    }
  }
  # Condense all config into a single `local.env.*`
  env = merge(local.all.default, try(local.all[terraform.workspace], {}))

  service_fqdn = local.env.service_name #.${local.env.domain_name}"

  # TODO: fix the postgres fqdn
  postgres_fqdn = "ucms-db.${local.env.domain_name}"

  # Convenience prefixes for AWS Resources
  prefix_bucket = "arn:aws:s3:::"
  #  prefix_ecr             = "${local.account_id}.dkr.ecr.${local.region}.amazonaws.com"
  prefix_parameter_store = "arn:aws:ssm:${local.region}:${local.account_id}:parameter"
}
