# Populating MongoDB with Amazon Books Data (Cloud Version) 

Needed Imports/pip installs:
~~~ python
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import opendatasets as od
import pandas as pd
import json
import os
~~~

Comment in/out and run as needed:
~~~ python
# !pip install pymongo
# !pip install dnspython
# !pip install opendatasets
# !pip install pandas
~~~

# CSV IMPORTS/CLEANING #

**Enter Kaggle user name and and generated token when prompted**
~~~ python
# Getting CSVs from Kaggle + downloading into directory
od.download("https://www.kaggle.com/datasets/mohamedbakhet/amazon-books-reviews?select=books_data.csv")

od.download("https://www.kaggle.com/datasets/mohamedbakhet/amazon-books-reviews?select=Books_rating.csv")

# pleaseeee dont steal my data
#ashleighperezo
#bc95d3a19aa8315bd3b8c59bfde37e26
~~~

**Opening CSV files and making sure everything populated**
~~~ python
# reading CSV files into DataFrames
booksDf = pds.read_csv(open("amazon-books-reviews/books_data.csv"))
ratingsDf = pds.read_csv(open("amazon-books-reviews/Books_rating.csv"))

# Displaying Table Sample
booksDf.head()
ratingsDf.head()
~~~

**Data Cleaning** *kind of a mess rn- will fix
~~~ python
booksDf.dropna(subset=['title', 'publisher'])
booksDf['categories'] = fix_category_name(booksDf['categories'])
booksDf['title_desc'] = booksDf['title'] + " " + booksDf['description'] # could be useful for adding ids
booksDf.rename(columns={
    "Title":"title",
    "categories":"genre",
    "ratingsCount":"ratings",
},inplace = True)

# via kaggle
def fix_category_name(data_col):
    result = []
    for item in data_col:
        result.append(item[2:len(item)-2]) #item[2:len(item)-2]
    return result
~~~

# MONGO SETUP #
~~~ python

# Establishing MongoDB connection
uri = "mongodb+srv://amperez:raraWvjp0DNp2bpx@cluster0.r2i5cmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Checking/pinging connection
try:
    client.admin.command('ping')
    print("Connection succesful")
except Exception as e:
    print(e)

# Creates and "book_reviews" Database and assigns it to 'db'
db = client['book_reviews']

# Collections are created under the book_reviews db
dcol = db['books_data']
rcol = db['books_rating']

# INSERTING CLEANED DATA INTO MONGODB #
#dcol.insert_many(data)
~~~

~~~ python
~~~