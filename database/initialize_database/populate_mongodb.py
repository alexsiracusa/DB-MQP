

# command to create a collection with a given name and jsonSchema
create_collection = """
db.createCollection("%s", {
    "validator": {
        "$jsonSchema": {
            %s
        }
    }
})
"""




