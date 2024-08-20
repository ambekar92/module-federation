# Alias Records
resource "aws_route53_record" "ipv4" {
  name            = "ucp.${local.env.domain_name}"
  type            = "A"
  zone_id         = data.aws_route53_zone.selected.id
  allow_overwrite = true

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
  }
}
resource "aws_route53_record" "ipv6" {
  name            = "ucp.${local.env.domain_name}"
  type            = "AAAA"
  zone_id         = data.aws_route53_zone.selected.id
  allow_overwrite = true

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
  }
}

# Distribution
resource "aws_cloudfront_distribution" "distribution" {
  aliases             = ["ucp.${local.env.domain_name}"]
  comment             = "ucms-wfe-${terraform.workspace}"
  enabled             = true
  http_version        = "http2"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  wait_for_deployment = true
  web_acl_id          = aws_wafv2_web_acl.waf_cloudfront.arn

  default_cache_behavior {
    allowed_methods = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT",
    ]
    cached_methods = [
      "GET",
      "HEAD",
    ]
    compress               = false
    default_ttl            = 86400
    max_ttl                = 31536000
    min_ttl                = 0
    smooth_streaming       = false
    target_origin_id       = "wfe"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      headers = [
        "*",
      ]
      query_string            = true
      query_string_cache_keys = []

      cookies {
        forward           = "all"
        whitelisted_names = []
      }
    }
  }

  logging_config {
    bucket          = "${local.account_id}-us-east-1-logs.s3.amazonaws.com"
    include_cookies = false
    prefix          = "cloudfront/${local.env.service_name}-wfe/${terraform.workspace}"
  }


  origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "ucms-wfe.${local.env.domain_name}"
    origin_id           = "wfe"

    custom_header {
      name  = "x-ussba-origin-token"
      value = nonsensitive(data.aws_ssm_parameter.origin_token.value)
    }

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  restrictions {
    geo_restriction {
      locations        = ["RU", "HK", "CN"]
      restriction_type = "blacklist"
    }
  }

  viewer_certificate {
    #acm_certificate_arn            = "arn:aws:acm:us-east-1:997577316207:certificate/687f2116-c2f7-4de7-a013-a078ef9f1dbd"
    acm_certificate_arn            = data.aws_acm_certificate.selected.arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2019"
    ssl_support_method             = "sni-only"
  }
}

# Cache Policies (Custom)
resource "aws_cloudfront_cache_policy" "one_week" {
  comment     = "Cache for one week, passing no cookies or query strings"
  default_ttl = 86400
  max_ttl     = 86400
  min_ttl     = 86400
  name        = "${local.env.service_name}-wfe-${terraform.workspace}-one-week"

  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true

    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "all"
    }
  }
}

# Origin Request Policies (Custom)
resource "aws_cloudfront_origin_request_policy" "empty" {
  comment = "Pass nothing but the domain"
  name    = "${local.env.service_name}-wfe-${terraform.workspace}-empty"

  cookies_config {
    cookie_behavior = "none"
  }

  headers_config {
    header_behavior = "none"
  }

  query_strings_config {
    query_string_behavior = "all"
  }
}
