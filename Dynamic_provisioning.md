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

### Method 1. Edit the Docker Service File:
Open the Docker service file with vim:
```
sudo vim /usr/lib/systemd/system/docker.service
```

* Modify the ExecStart line to include -H tcp://0.0.0.0:2375
```
  ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H fd:// --containerd=/run/containerd/containerd.sock
```

* Reload the systemd configuration
```
sudo systemctl daemon-reload
```

* Restart Docker  
```
sudo systemctl restart docker
```
### Method 2: Configuring Docker Daemon via JSON File
* Edit the Docker Daemon Configuration File:
```
sudo vim /etc/docker/daemon.json
```

* Add the following configuration:
```
{
  "hosts": ["tcp://0.0.0.0:2375", "unix:///var/run/docker.sock"]
}
```

* Restart Docker to apply changes
```
sudo systemctl restart docker
```
- Editing the Systemd Service File: Provides direct command-line control over Docker startup options but can be more prone to errors and may be overwritten during system updates.

- Editing daemon.json: Offers a structured and standardized way to configure Docker, is generally easier to manage, and is recommended for persistent configurations.


## 2. Install the Docker Plugin in Jenkins
Navigate to Jenkins Plugin Manager:

- Go to Manage Jenkins > Manage Plugins.
- Go to the Available tab, search for Docker, and install the Docker Commons and Docker Pipeline plugins.
  
 ###  Configure Docker Cloud in Jenkins
Access Jenkins Configuration:
- Go to Manage Jenkins > Manage Clouds > Configure Clouds.
- Click Add a new cloud and select Docker.
- Give a name and create
  
**Configure Docker Cloud Settings:**

- **Click on Docker Cloud details**

- Docker host URL: Specify the Docker daemon URL running on your AWS instance (e.g., tcp://<EC2_INSTANCE_PUBLIC_IP>:2375).

- Server credentials: If your Docker daemon requires authentication, add Docker host credentials. For unsecured TCP access (not recommended), you can leave credentials empty.
- Enable.

- **Click Docker Agent templates:** Add Docker templates for the containers you want to launch as agents. Click Add under Docker Templates.
  
- Labels: Assign labels to identify the Docker container agents (e.g., build-agent).
- Click **Enable**

- Docker Image: Specify the Docker image for your agent (e.g., maven:3.6-jdk-11).

- Container Settings: Configure container settings such as environment variables, commands, and resource limits.

- Remote FS Root: Specify the file system root inside the container (e.g., /home/jenkins).

- Usage: Chose the option according to your need. "Only build jobs with labels expression matching this node"

- Connect method: Chose the option according to your need. "Use configured SSH credentials" . If you chose SSH, the follow the prerequisites:
  
    -  The docker container's mapped SSH port, typically a port on the docker host, has to be accessible over network from the master.
    -  Docker image must have sshd installed.
    -  Docker image must have Java installed.
    - Log in details configured as per ssh-slaves plugin.
        - Under SSH Credentials, select jenkins and add your slave image username and passwd/the ssh pub key.
        - Host Key Verification Strategy: Non verifying verification strategy.
- Pull strategy: choose according to your need. If you using versioning in your image, the choose **Pull all image everytime** or else **Never pull**

**Configure Docker Template Settings:**

- Container Cap: Define the maximum number of containers to run simultaneously.

- Container Configuration: Set up the Docker container configuration, such as volumes and environment variables. Ensure that the container has the required tools and configurations for your Jenkins jobs.
