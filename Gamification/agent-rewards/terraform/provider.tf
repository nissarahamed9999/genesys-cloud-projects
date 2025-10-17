terraform {
  required_providers {
    archive = {
      version = ">= 2.0"
      source  = "hashicorp/archive"
    }

    genesyscloud = {
      source = "mypurecloud/genesyscloud"
    }
  }
}

provider "genesyscloud" {

    oauthclient_id     = "24c5c8be-5b96-4854-8a46-29da181ab338"
  oauthclient_secret = "S_FmlNGnSA44tWRzmNUK4LWLPxIH670aMKWbqscHqGk"
  aws_region = "us-east-1"
}
