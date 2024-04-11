#!/bin/bash

workspace=`terraform workspace show`
[ "$workspace" == "demo" ] && domain_name='demo.sba-one.net'
[ "$workspace" == "stg" ]  && domain_name='stg.certify.sba.gov'
[ "$workspace" == "prod" ] && domain_name='certify.sba.gov'

import() {
  terraform state show "$1" > /dev/null 2>&1
  if [[ "$?" != "0" ]]; then
    terraform import "$1" "$2" > /dev/null 2>&1
    if [[ "$?" != "0" ]]; then
      echo "Failure:  $1 $2"
      return 1
    else
      echo "Success:  $1 $2"
      return 0
    fi
  else
    echo "Existing: $1 $2"
    return 0
  fi
}

# CloudFront Distribution
distribution_id=`aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items || ['None'], '${domain_name}')].Id" --output text`
import 'aws_cloudfront_distribution.distribution' ${distribution_id}

# Cache Policies
policy_id1=`aws cloudfront list-cache-policies --query "CachePolicyList.Items[?Type == 'custom' && CachePolicy.CachePolicyConfig.Name=='${workspace}-one-week'].CachePolicy.Id" --output text`
import 'aws_cloudfront_cache_policy.one_week' ${policy_id1}

# Origin Request Policies
policy_id2=`aws cloudfront list-origin-request-policies --query "OriginRequestPolicyList.Items[?Type == 'custom' && OriginRequestPolicy.OriginRequestPolicyConfig.Name == '${workspace}-empty'].OriginRequestPolicy.Id" --output text`
import 'aws_cloudfront_origin_request_policy.empty' ${policy_id2}
