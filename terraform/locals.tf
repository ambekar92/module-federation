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
      service_name      = "ucp"
      service_name_alt  = "ucp"
      # ecr_name_nginx    = "certify/sba-app-nginx"
      ucp_port        = "8080"
      task_cpu_ucp    = "4096"
      task_memory_ucp = "8192"
      log_bucket        = "${local.account_id}-us-east-1-logs"
      db_port           = "5432"

      # health_check_path         = "/activity"
      desired_capacity_ucp    = 1
      min_container_count_ucp = 1
      max_container_count_ucp = 1
      scaling_metric            = "memory"
      scaling_threshold         = "75"

      scheduled_actions          = []
      scheduled_actions_timezone = "America/New_York"

    }
    demo = {
      domain_name             = "demo.sba-one.net"
      cert_domain             = "sba-one.net"
      ucp_env                 = "demo"
      max_sba_issuer          = "demo-certify-sba-gov"
      oai_id                  = "E1PVFJGLUVYCEO" # This is only needed if we use cloudfront
      db_host                 = "ucp-db.demo.sba-one.net"
      distribution_url        = "https://d3eivjwm5b8rit.cloudfront.net"
      ucp_tracking_id         = "null"
      next_base_url           = "https://ucp.demo.sba-one.net"
      # next_public_logout_url  = "https://login.test.mysba.ussba.io"
      # okta_oauth2_issuer      = "https://login.test.mysba.ussba.io/oauth2/default"
      next_public_logout_url    = "https://login.stg.mysba.ussba.io"
      okta_oauth2_issuer        = "https://login.stg.mysba.ussba.io/oauth2/default"
      redis_host              = "demo-shared-services.alb2c1.ng.0001.use1.cache.amazonaws.com"
      next_public_random      = "7CKKEae1lWSWuFQVzJ7JkeN8lzcvAVcchp7pqItpsBIXTGZuexwrVZxORYQEnQb5U0AfXRnDWAQXmCQdza5Rtw58CpyO7o9GvP8vwTvFOfBdz8KagO0P2W0tKDy6qySKVoTMEJ7T4ZvCVF1mGACtlV3a6JojkpWO"
      next_public_debug       = "true"
    }
    stg = {
      domain_name           = "stg.certify.sba.gov"
      cert_domain           = "stg.certify.sba.gov"
      oai_id                = "E13BTMXKQCJ8EC" # This is only needed if we use cloudfront
      certs_bucket          = "298969701643-us-east-1-staging-certifications" # Not sure if this is needed
      distribution_url      = "https://d2ooza27avgm5e.cloudfront.net"

      desired_capacity_ucp     = 1
      min_container_count_ucp  = 1
      max_container_count_ucp  = 1

      ucp_env                   = "stage"
      db_host                   = "ucp-db.stg.certify.sba.gov" 
      ucp_tracking_id           = "null"
      next_base_url             = "https://ucp.stg.certify.sba.gov"
      next_public_logout_url    = "https://login.stg.mysba.ussba.io"
      okta_oauth2_issuer        = "https://login.stg.mysba.ussba.io/oauth2/default"
      redis_host                = "stg-shared-services.2s2zep.ng.0001.use1.cache.amazonaws.com"
      next_public_random        = "7CKKEae1lWSWuFQVzJ7JkeN8lzcvAVcchp7pqItpsBIXTGZuexwrVZxORYQEnQb5U0AfXRnDWAQXmCQdza5Rtw58CpyO7o9GvP8vwTvFOfBdz8KagO0P2W0tKDy6qySKVoTMEJ7T4ZvCVF1mGACtlV3a6JojkpWO"
      next_public_debug         = "true"
    }
    prod = {
      domain_name               = "certification.sba.gov"
      cert_domain               = "certification.sba.gov"
      oai_id                    = "E1HEQ3JCZ916O8" # This is only needed if we use cloudfront
      certs_bucket              = "298969701643-us-east-1-prod-certifications"
      db_host                   = "ucp-db.certification.sba.gov" 
      distribution_url          = "https://dzjorhrnuv7ld.cloudfront.net"
      ucp_tracking_id           = "G-459N1YBHGW"
      next_base_url             = "https://certification.sba.gov"
      next_public_logout_url    = "https://login.sba.gov"
      okta_oauth2_issuer        = "https://login.sba.gov/oauth2/default"
      redis_host                = "prod-shared-services.2s2zep.ng.0001.use1.cache.amazonaws.com"
      next_public_random        = "2ipPd999d2bd39c1c7b83c7b35d84933ba09d492e43a6484560339334e6c4fdfe435bakaOv4M9kPzY7cg4ceXQZOjEgVg"
      next_public_debug         = "false"

      desired_capacity_ucp    = 1
      min_container_count_ucp = 1
      max_container_count_ucp = 10
      ucp_env                 = "prod"
      task_cpu_ucp            = "8192"
      task_memory_ucp         = "32768"
    }
  }
  # Condense all config into a single `local.env.*`
  env = merge(local.all.default, try(local.all[terraform.workspace], {}))

  service_fqdn = local.env.service_name #.${local.env.domain_name}"

  # TODO: fix the postgres fqdn
  postgres_fqdn = terraform.workspace == "demo" ? "ucms-db.${local.env.domain_name}" : "ucp-db.${local.env.domain_name}"

  # Convenience prefixes for AWS Resources
  prefix_bucket = "arn:aws:s3:::"
  #  prefix_ecr             = "${local.account_id}.dkr.ecr.${local.region}.amazonaws.com"
  prefix_parameter_store = "arn:aws:ssm:${local.region}:${local.account_id}:parameter"
}
