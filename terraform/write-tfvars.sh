#!/bin/bash

TAG=`terraform state show module.rails.aws_ecs_task_definition.fargate | grep -E 'image\s+=' | tail -n1 | cut -d: -f2 | sed -e 's/"//g'`
echo "image_tag = \"${TAG}\"" > terraform.tfvars
