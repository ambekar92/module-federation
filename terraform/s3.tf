resource "aws_s3_bucket" "ucp_maintenance" {
  count  = terraform.workspace == "prod" ? 1 : 0
  bucket = "certification.sba.gov"
#   policy = data.aws_iam_policy_document.allow_access_cloudfront.json

  tags = {
    Name = "managedBy: Terraform"
  }
}

# resource "aws_s3_bucket_acl" "ucp_acl" {
#   bucket = aws_s3_bucket.ucp_maintenance.id
#   acl    = "private"
# }

# resource "aws_s3_bucket_policy" "allow_access_cloudfront" {
#   bucket = aws_s3_bucket.ucp_maintenance.id
#   policy = data.aws_iam_policy_document.allow_access_cloudfront.json
# }

# data "aws_iam_policy_document" "allow_access_cloudfront" {
#   statement {
#     principals {
#       type        = "AWS"
#       identifiers = ["*"]
#     }

#     actions = [
#       "s3:GetObject"
#     ]

#     resources = [
#       "${aws_s3_bucket.ucp_maintenance.arn}/*",
#     ]

#     sid = "PublicReadGetObject"

#     effect = "Allow"
#   }
# }