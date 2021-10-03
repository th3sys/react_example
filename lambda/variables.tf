# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "s3_bucket_name" {
  description = "AWS S3 bucket name."

  type    = string
  default = "release-bucket-name-2021"
}
