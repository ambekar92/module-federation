data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

terraform {
  required_version = "1.9.0"
  required_providers {
    aws = {
      version = "~> 5.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region              = "us-east-1"
  allowed_account_ids = [local.account_ids[terraform.workspace]]
}
