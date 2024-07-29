# Dynamic  Slave Node Provision
Dynamic provisioning in Jenkins refers to the ability to automatically create and manage build agents (slaves) based on the demand for resources. This approach helps optimize resource usage and reduces costs by provisioning agents only when needed and decommissioning them when they are no longer required.

## Multi Cloud-Based Providers
Jenkins supports dynamic provisioning through various cloud-based providers like AWS, Google Cloud, and Azure. Each of these providers can dynamically create and manage build agents as required.
## We are going to use AWS EC2 to dynamically proviosion docker container as build agent.

# Steps to Configure Jenkins to Use Docker Containers on AWS

## 1. Set Up Docker on AWS
Launch an EC2 Instance:
Launch an EC2 instance that will host the Docker daemon. Ensure this instance has the appropriate IAM role to allow it to communicate with AWS services if needed.
### Install Docker:
SSH into the EC2 instance and install Docker.

```
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user
```
### Configure Docker Daemon:

Configure Docker to listen on a TCP port (e.g., 2375) by editing the Docker configuration file.
There are two ways to achieve this:
**1. Edit the Docker Service File:**
Open the Docker service file with vim:
```
sudo vim /usr/lib/systemd/system/docker.service
```
Modify the ExecStart line to include -H tcp://0.0.0.0:2375
