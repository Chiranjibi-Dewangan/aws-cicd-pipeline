#!/bin/bash
set -e

# Log everything
exec > >(tee /var/log/user-data.log)
exec 2>&1

echo "=== Starting user data script ==="
echo "Timestamp: $(date)"

# Update system
echo "Updating system packages..."
dnf update -y

# Install Docker
echo "Installing Docker..."
dnf install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install AWS CLI v2
echo "Installing AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -q awscliv2.zip
./aws/install
rm -rf aws awscliv2.zip

# Login to ECR
echo "Logging into ECR..."
aws ecr get-login-password --region ${aws_region} | docker login --username AWS --password-stdin ${ecr_repo}

# Pull and run container
echo "Pulling Docker image from ECR..."
docker pull ${ecr_repo}:latest

echo "Starting application container..."
docker run -d \
  -p ${app_port}:${app_port} \
  -e ENVIRONMENT=${environment} \
  --restart unless-stopped \
  --name app \
  ${ecr_repo}:latest

echo "=== User data script completed ==="
echo "Timestamp: $(date)"
