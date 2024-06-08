# Set-up Instructions for MongoDB Community Edition

This guide explains how to set up a MongoDB cluster to run on MacOS without homebrew or other installers.  

While MacOS specifically is used, the only things that would change for other operating systems are which files to download from the mongodb website and file path names.

The official installation instructions for any OS can be found on https://mongodb.com, specifically [here](https://www.mongodb.com/docs/manual/administration/install-community/)

## Step 1 - Download MongoDB
Download the correct version of **MongoDB Community Edition** for Mac from the official website page at [here](https://www.mongodb.com/try/download/community)

Unzip the .tgz file.  It is recommended to rename the original folder from `mongodb-macos-aarch64-7.0.11` (name changes based on OS) to something shorter like `mongodb` or `mongodb_7.0.11`

Copy the resulting `mongodb_7.0.11` folder to wherever you want it to be installed. `/usr/local/` is my recommendation, which can be done with:

```
sudo cp -r /users/*YOURMACUSER*/downloads/mongodb_7.0.11/ /usr/local/
```

The resulting file structure should look like this:
```
/usr/local/mongodb_7.0.11/
│
└── bin/
    ├── mongod
    └── mongos
├── LICENSE-Community.txt
└── ...more files
```

For convenience, add `/usr/local/mongodb_7.0.11/bin` to your `PATH` environment variable. This will allow you to run `mongod` and `mongos` from anywhere in the terminal. 

If you don't want to do this, whenever either is run in a terminal in this tutorial, replace `mongod` with `/usr/local/mongodb_7.0.11/bin/mongod` and it will work the same way.


## Step 2 - Download the MongoDB Shell
Download `mongosh`, the mongodb shell, from [here](https://www.mongodb.com/try/download/shell).

Once unzipped, it will have a bin folder that contains `mongosh` and `mongosh_crypt_v1.dylib`.

From here you can either:
1. Move both into `/usr/local/mongodb_7.0.11/bin` where `mongos` and `mongod` already are.
2. Move both into `/usr/local/bin`
3. Create symbolic links to wherever you would like to store them using:
```
sudo ln -s path_to_mongosh/* /usr/local/bin/
```

This will allow you to type `mongosh` in any terminal and execute the shell.


## Step 3 - Create Configuration Files
Different installers may create config files under different directories, however any path can be used. In order to keep everything in the same place, we will store them in `usr/local/mongodb_7.0.11/etc/`, and can be organized as follows:

```
/usr/local/mongodb_7.0.11/etc/
│
├── configsvr.conf
├── shard.conf
└── mongos.conf
```

In order to run a MongoDB cluster, a minimum of three servers are required, hence the three config files.  

The `query router` server must be set up, which handles and routes queries to the cluster. This is what other applications will interact with.

One or more `shard` servers are required, which manage and access the database directly. Multiple shards can be created to improve performance through horizontal scaling More details can be found [here](https://www.mongodb.com/docs/manual/sharding/#sharding-procedure-config-server)

The `config` server interacts with both the `shard` and `query router` servers. Three are recommended for production, however only one is required for development and testing. I honestly have no clue what it does, but it needs to be there or the whole thing won't run :)

### Create a config file for the query router: `mongos.conf`
```yaml
# mongos.conf
net:
    bindIp: localhost
    port: 27017

sharding:
    configDB: configReplSet/localhost:27019
```
> **IMPORTANT:** 
> MongoDB configuration files us the YAML format, which does not support tab characters for indention. Use spaces instead.

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
    dbPath: /usr/local/mongodb_7.0.11/data/db
```
> **Note:** If you want multiple shards, you need multiple config files such as `shard1.conf`, `shard2.conf`, etc.

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
    dbPath: /usr/local/mongodb_7.0.11/data/configdb
```


## Step 4 - Create Data Directories
As you may have noticed in `shard.conf` and `configsrv.conf`, the dbPath property is specified. By default, data is stored at `/data/db`. To keep everything together again, we will create the directories seen in the config files.

The resulting file system should look like this:
```
/usr/local/mongodb_7.0.11/
│
├── bin/
└── data/
    ├── configdb/
    └── db/
└── etc.
    ├── configsvr.conf
    ├── shard.conf
    └── mongos.conf
```

> **Note:** If you are using multiple shard (or config) servers, each must have its own db folder such as `/usr/local/mongodb_7.0.11/data/db1`, `/usr/local/mongodb_7.0.11/data/db2` etc.

## Step 5 - Start MongoDB Servers

### Start Config Server
```
sudo mongod --config /usr/local/mongodb_7.0.11/etc/configsvr.conf
```
> **NOTE:** Each server has to be run in seperate terminal window


### Start Shard Server(s)
```
sudo mongod --config /usr/local/mongodb_7.0.11/etc/shard.conf
```

### Start Query Router
```
sudo mongos --config /usr/local/mongodb_7.0.11/etc/mongos.conf
```

## Step 6 - Initialize Replica Sets
Connect to each MongoDB instance using `mongosh` and initiate the replica sets.

```shell
# config server (port 27019)
mongosh --port 27019
>> rs.initiate()
```

```shell
# shard server (port 27018)
mongosh --port 27018
>> rs.initiate()
```

Connect to the query router run with `mongos` and add all shard(s) to the cluster.

```shell
# query router (port 27017)
mongosh --port 27017
>> sh.addShard("shard1ReplSet/localhost:27018")
```


## Step 7 - Create a Database
Within the same `mongosh` shell connected to the query router as above, run the following:

```shell
# query router (port 27017)
mongosh --port 27017
>> use my_db_name
switched to db my_db_name
>> db.createCollection("my_collection")
>> db.my_collection.insertOne({"item": "apples"})
```
> **Note:** `my_db_name` and `my_collection` can be replaced with whatever you would like to name them

Now you have a database created and running, and can run queries such as `db.my_collection_find({})` or connect via external tools.


## Step 8 - Install MongoDB Compass (Optional)
You may want to download MongoDB Compass found [here](https://www.mongodb.com/try/download/compass). It allows you to edit, create, and query your databases using a GUI instead of terminal commands.




