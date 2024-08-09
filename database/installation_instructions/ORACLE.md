# Installation Instructions for Oracle

This guide explains how to set up an Oracle database to run on macOS using Docker. It is heavily based on the following YouTube video: https://www.youtube.com/watch?v=uxvoMhkKUPE.


## Step 1 - Download Docker Desktop
Download and install Docker Desktop from their website found here: https://www.docker.com/products/docker-desktop/. Make sure download the correct version for ARM computers.

This will also install docker command-line tools which will be need later.

Open the application once installed so that docker is running.


## Step 2 - Download Oracle Database Enterprise Edition 19c
From Oracle's website download page found [here](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html), download `Oracle Database 19c for LINUX ARM (aarch64)` if you have an ARM mac, or `Oracle Database 19c for Linux x86-64` if you do not.

This will require you to create an account with Oracle to download. It will be annoying and ask you to put in stuff like "company position" and "work phone" - just put filler answers as it won't let you leave them empty.


## Step 3 - Create the Docker Image
Clone Oracle's official `docker-images` repository found [here](https://github.com/oracle/docker-images).

Within the repository, navigate to `docker-images/OracleDatabase/SingleInstance/dockerfiles/`. 

Move zip file downloaded from step 2 into the `dockerfiles/19.3.0/` folder. Do not unzip the file.

Next, from within the `dockerfiles/` folder run `./buildContainerImage.sh -v 19.3.0 -e`. If it says it cannot find `buildContainerImage.sh` it is likely because you are in the wrong directory. If it says it cannot connect to the docker daemon, it could be because docker is not running.

The build should take around 2-5 minutes to complete.


## Step 4 - Run the Docker Container
Run a container using the image from step 3 with the following command:

`docker run -d --name oracle19.3 -e ORACLE_PWD=password -p 1521:1521 oracle/database:19.3.0-ee `

The flags in the command do the following:
- `-d` makes the process run in the background.
- `--name oracle19c` sets the name of the container. You can change this if you'd like.
- `-e ORACLE_PWD=password` sets the password of the `SYS` account.
- `-p 1521:1521` maps the container port `1521` (right) to your computer's port `1521' (left).
- `oracle/database:19.3.0-ee` specifies the image name to create the container from (i.e. the image we just made).

The full documentation on the command line arguments can be found on the GitHub `README.md` [here](https://github.com/oracle/docker-images/tree/main/OracleDatabase/SingleInstance#how-to-build-and-run). 


## Appendix: Connection Parameters
```
Username:       SYS
Role:           SYSDBA
Password:       password (or whatever you set it to in step 4)
Hostname:       localhost
Port:           1521
Service_Name:   ORCLCDB (essentially the name of the database)
```


