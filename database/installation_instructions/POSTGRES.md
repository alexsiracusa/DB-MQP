# Installation Instructions for Postgres

This guide explains how to set up a local Postgres server on macOS using Postgres.app

Their official instructions are found on their website https://postgresapp.com.

## Step 1 - Download Postgres.app
Download the latest version of Postgres.app from the [here](https://postgresapp.com/downloads.html).  Then move the app to your applications folder and launch it. Click "Initialize".

That's it, you're done.

The application will show icons for a few default databases it has created. Double-click any of them to open it in the terminal where you can query the database directly.

The official instructions also include how to optionally add command line tools to your `$PATH` environment variable.

## Appendix: Connection Parameters
```
HOST:       localhost
PORT:       5432
USER:       'your system user name'
DATABASE:   'same as user'
PASSWORD:   'none'

Connection URL: postgresql://localhost
```

