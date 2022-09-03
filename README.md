# random user API using Express and Node Js.

Live Server [https://randomuserapi-seby.onrender.com/api/v1/user](https://randomuserapi-seby.onrender.com/api/v1/user).

## Features & Functionalities

I have performed CRUD operations on the .json file using Express and the file system module

### GET: /user/random A random user
- Get a random user from the .json file

### GET: /user/all A list of random users
- Get all the users from the .json file
- Limit the number of users using query parameter(s)

### POST: /user/save Save a random user
- Save a user in the .json file
- validate the body and check if all the required properties are present in the body.

### PATCH: /user/update Update a random user
- Update a user's information in the .json file using its id
- validate the user id

### PATCH: /user/bulk-update update multiple users
- Update multiple users' information in the .json file
- Take an array of user ids and assign it to the body.
- validate the body.

### DELETE: /user/ delete
- Delete a user from the .json file using its id
- validate the user id

## Used Technologies

The following technologies was used to complete the challenge:

-   node.js
-   express.js
-   cors
-   dotenv
-   nodemon
