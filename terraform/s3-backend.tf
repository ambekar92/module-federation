terraform {
  backend "s3" {
    bucket               = "sba-certify-terraform-remote-state"
    region               = "us-east-1"
    dynamodb_table       = "terraform-state-locktable"
    acl                  = "bucket-owner-full-control"
    key                  = "ucp-wfe.tfstate"
    workspace_key_prefix = "ucp-wfe"
  }
}
