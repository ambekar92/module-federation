locals {
  waf_cloudfront = {
    name = "${terraform.workspace}-${local.env.service_name}-wfe-cloudfront-acl"
  }
}

resource "aws_wafv2_web_acl" "waf_cloudfront" {
  description = local.waf_cloudfront.name
  name        = local.waf_cloudfront.name
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

#   # This group contains rules that are based on Amazon threat intelligence. This is useful
#   # if you would like to block sources associated with bots or other threats.
#   # - https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-ip-rep.html
  rule {
    priority = 0
    name     = "amazon-ip-reputation"
    override_action {
      none {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-ip-reputation"
      sampled_requests_enabled   = false
    }
  }

#   # RateLimit for DDoS protections
  rule {
    name     = "rate-limit"
    priority = 1
    action {
      block {}
    }
    statement {
      rate_based_statement {
        aggregate_key_type = "IP"
        limit              = 2700
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "rate-limit"
      sampled_requests_enabled   = false
    }
  }

#   # Use-case specific rule groups provide incremental protection for many diverse AWS WAF use cases.
#   # - https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html
  rule {
    name     = "sql-injection"
    priority = 2
    dynamic "override_action" {
      for_each = contains(["prod"], terraform.workspace) ? ["ON"] : []
      content {
        count {}
      }
    }
    dynamic "override_action" {
      for_each = contains(["demo", "stg"], terraform.workspace) ? ["ON"] : []
      content {
        none {}
      }
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesSQLiRuleSet"
        vendor_name = "AWS"
        #excluded_rule {
        #  name = "SQLi_BODY"
        #}
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-sqli"
      sampled_requests_enabled   = false
    }
  }

#   # Baseline managed rule groups provide general protection against a wide variety of
#   # common threats. Choose one or more of these rule groups to establish baseline protection for your resources.
#   # - https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html
  rule {
    priority = 3
    name     = "amazon-common"
    override_action {
      count {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "aws-common"
      sampled_requests_enabled   = false
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${terraform.workspace}-${local.env.service_name}-cloudfront-acl"
    sampled_requests_enabled   = false
  }
}
