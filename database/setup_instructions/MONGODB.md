# Set-up Instructions for MongoDB Community Edition

This guide explains how to set up a MongoDB cluster to run on MacOS without homebrew or other installers.  

While MacOS specifically is used, the only things that would change for other operating systems are which files to download from the mongodb website and file path names.

The official installation instructions for any OS can be found on https://mongodb.com, specifically [here](https://www.mongodb.com/docs/manual/administration/install-community/)

## Step 1 - Download MongoDB
Download the correct version of **MongoDB Community Edition** for Mac from the official website page at [here](https://www.mongodb.com/try/download/community)

Unzip the .tgz file.  It is recommended to rename the original folder from `mongodb-macos-aarch64-7.0.11` (name changes based on OS) to something shorter like `mongodb` or `mongodb_7.0.11`

Copy the resulting `mongodb` folder to wherever you want it to be installed. `/usr/local/` is my recommendation, which can be done with:

```
sudo cp -r /users/*YOURMACUSER*/downloads/mongodb_7.0.11/ /usr/local/
```

## Step 2 - Create Configuration Files
Different installers may create config files under different directories, however any path can be used. In order to keep everything in the same place, we will store them in `usr/local/mongodb_7.0.11/etc/`, and can be organized as follows:

```
/usr/local/mongodb_7.0.11/etc/
│
├── configsvr.conf
├── shard.conf
└── mongos.conf
```

In order to run a MongoDB cluster, a minimum of three servers are required, hence the three config files.  

One or more `shard` servers are required, which manage and access the database directly. Multiple shards can be created to improve performance through horizontal scaling More details can be found [here](https://www.mongodb.com/docs/manual/sharding/#sharding-procedure-config-server)

A `query router` server must be set up and run with `mongos`, which handles and routes queries to the cluster. This is what other applications will interact with.

The `config` server interacts with both the `shard` and `router` servers. Three are recommended for production, however only one is required for development and testing. I honestly have no clue what it does, but it needs to be there or the whole thing won't run :)

### Create a config file(s) for the shard server(s): `shard.conf`
```yaml
# shard.conf
sharding:   
  clusterRole: shardsvr

replication:
  replSetName: shard1ReplSet

net:
    bindIp: localhost
    port: 27018
    
storage:
    dbPath: /usr/local/mongodb/data/db
```
> **IMPORTANT:** 
> MongoDB configuration files us the YAML format, which does not support tab characters for indention: use spaces instead.


> If you want multiple shards, you need multiple config files such as `shard1.conf`, `shard2.conf`, etc.

### Create a config file for the query router: `mongos.conf`
```yaml
# mongos.conf
net:
    bindIp: localhost
    port: 27017

sharding:
    configDB: configReplSet/localhost:27019
```

### Create a config file for the config server(s): `configsrv.conf`
```yaml
# configsvr.conf
sharding:
    clusterRole: configsvr

replication:
    replSetName: configReplSet     

net:
    bindIp: localhost                           
    port: 27019

storage:
    dbPath: /usr/local/mongodb/data/configdb
```


