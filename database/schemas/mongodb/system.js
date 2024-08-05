// run this file with "mongosh admin < system.js"

db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {role: "userAdminAnyDatabase", db: "admin"},
            {role: "readWriteAnyDatabase", db: "admin"},
            {role: "root", db: "admin" }
        ]
    }
)