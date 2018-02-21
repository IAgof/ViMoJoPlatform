# ViMoJoPlatform

Repository for orchestration of vimojo platform and setup of different environment deployments

Three compose definitions are currently present in this repo:  
[docker-compose.yml](docker-compose.yml) defines needed setup for production deployment  
[docker-compose.override.yml](docker-compose.override.yml) defines needed setup for deploy testing environments, with 
all necessary services that mock external providers dependencies such as google-clowd or AWS services  
[docker-compose.yml](docker-compose.yml) used for local development. Defines volume mounts to share local source code 
with containers, and use dev utilites such as nodemon in backend to run the server or watch and serve pipelines on 
frontend

## Setup the enviroment

To start the development environment we need to have the ability to execute docker commands (we need the docker cli), 
to execute docker compositions (we need docker-compose utility), and to run docker containers (thus we need docker 
engine installed on our computer or have access to other computer that has it up and running).

To install docker CLI, docker engine or docker-compose or docker-machine utilities, please refer to official guides 
under docker documentation web at:
* [Install Docker for Windows](https://docs.docker.com/docker-for-windows/install/) 
* [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
* [Install Docker for Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
* [Install Docker for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

Alternatively to install docker engine in our computer, we can access to a machine with docker engine installed, for 
example, creating a virtual machine or a hosted VPS on our favorite cloud provider such as AWS or google cloud. This 
can be done using docker-machine, that will create the docker enabled machine for us, using a 
[driver](https://docs.docker.com/machine/drivers/) of our choice, and connect local docker CLI to remote docker engine 
on created machine. 

## Start the platform

### Needed environment variables to spectify our service composition

If we want to use specific versions of backend and frontend services, we'll need to specify tag version for each one: 

>BACKEND_TAG=0.1.0  
>FRONTEND_TAG=0.1.0

These vars are only needed for generic docker-compose.yml now, and intended for production deployment.

### Development environment

To start our local platform development environment we would compose service definitions with the three above mentioned 
compose definition files, in order, specifying files to docker compose with `-f` flag:

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml
```

As per build directives for both backend and frontend services, docker-compose would expect having backend and frontend 
repos cloned into the same directory of compose definition under `MoJoFy` and `platform-frontend`. They will be included 
later as git submodules into this very own repo. 


To build the containers defined in the composition run build command:

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml build
```

To launch all the containers defined in the composition run the up command. Use -d flag to dettach run from the 
terminal and run them in background:

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml up -d
```

To see the logs of all images run in the definition use logs command. Use -f to follow logs:

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml logs -f
```

You can also specify one service for each of the above mentioned commands, ie. for backend logs use:

```
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.dev.yml logs -f backend
```

#### Override config vars

Config vars are injected to running container images using environment variables. You can define your own values in 
dotenv files, ignored by .gitignore file:

> Use .env_backend.prod to override environment variables defined in docker-compose.yml  
> Use .env_backend.ovr to override environment variables defined in docker-compose.override.yml  
> Use .env_backend.dev to override environment variables defined in docker-compose.dev.yml

Note that if a environment variable is defined in both composition file and its correspondig dotenv file, the 
composition environment value will override the one defined in your dotenv file, even if its undefined or empty. 

It's recommended to specify overrides for development only in `.env_backend.dev` or in a new composition file

Use the format of the files as:

```
SENDGRID_API_KEY=myapikey
BACKEND_EMAIL_NOTIFICATIONS_RECEIVER=email@info.com
```

Some of the configuration values are defined for using a local environment variable, such as:

```
- BACKEND_EMAIL_NOTIFICATIONS_RECEIVER=${EMAIL_NOTIFICATIONS_RECEIVER}
```

You can set the var having a local env var called `EMAIL_NOTIFICATIONS_RECEIVER` 