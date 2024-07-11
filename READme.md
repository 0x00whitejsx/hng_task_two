# BACKEND Stage 2 Task: User Authentication & Organisation

Using your most comfortable backend framework of your choice, adhere to the following acceptance criteria:

## Acceptance Criteria

### Connect to Postgres Database

Connect your application to a Postgres database server. *(Optional: you can choose to use any ORM of your choice if you want or not).*

### Create User Model

Create a User model with the following properties:
```json
{
  "userId": "string", // must be unique
  "firstName": "string", // must not be null
  "lastName": "string", // must not be null
  "email": "string", // must be unique and must not be null
  "password": "string", // must not be null
  "phone": "string"
}
Using the schema above, implement user authentication

### User Registration:
Implement an endpoint for user registration. Hash the user’s password before storing them in the database.

**Successful Response:** Return the payload with a 201 success status code.
```json
{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
Unsuccessful registration response:

json
Copy code
{
  "status": "Bad request",
  "message": "Registration unsuccessful",
  "statusCode": 400
}
User Login:
Implement an endpoint for user Login. Use the JWT token returned to access PROTECTED endpoints.

Login request body:

json
Copy code
{
  "email": "string",
  "password": "string"
}
Successful Response: Return the payload with a 200 success status code.

json
Copy code
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
Unsuccessful login response:

json
Copy code
{
  "status": "Bad request",
  "message": "Authentication failed",
  "statusCode": 401
}
Organisation:
A user can belong to one or more organisations. An organisation can contain one or more users. On every registration, an organisation must be created. The name property of the organisation takes the user’s firstName and appends “Organisation” to it. For example: user’s first name is John, organisation name becomes "John's Organisation" because firstName = "John".

Logged in users can access organisations they belong to and organisations they created.

Organisation Model:
json
Copy code
{
  "orgId": "string", // Unique
  "name": "string", // Required and cannot be null
  "description": "string"
}
Endpoints:
[POST] /auth/register - Registers a user and creates a default organisation. Register request body:

json
Copy code
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
Successful response: Return the payload below with a 201 success status code.

json
Copy code
{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
Unsuccessful registration response:

json
Copy code
{
  "status": "Bad request",
  "message": "Registration unsuccessful",
  "statusCode": 400
}
[POST] /auth/login - Logs in a user. When you log in, you can select an organisation to interact with. Login request body:

json
Copy code
{
  "email": "string",
  "password": "string"
}
Successful response: Return the payload below with a 200 success status code.

json
Copy code
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
Unsuccessful login response:

json
Copy code
{
  "status": "Bad request",
  "message": "Authentication failed",
  "statusCode": 401
}
[GET] /api/users/
- A user gets their own record or user record in organisations they belong to or created. [PROTECTED]
Successful response: Return the payload below with a 200 success status code.

json
Copy code
{
  "status": "success",
  "message": "<message>",
  "data": {
    "userId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  }
}
[GET] /api/organisations - Gets all your organisations the user belongs to or created. If a user is logged in properly, they can get all their organisations. They should not get another user’s organisation. [PROTECTED]
Successful response: Return the payload below with a 200 success status code.

json
Copy code
{
  "status": "success",
  "message": "<message>",
  "data": {
    "organisations": [
      {
        "orgId": "string",
        "name": "string",
        "description": "string"
      }
    ]
  }
}
[GET] /api/organisations/
- The logged in user gets a single organisation record. [PROTECTED]
Successful response: Return the payload below with a 200 success status code.

json
Copy code
{
  "status": "success",
  "message": "<message>",
  "data": {
    "orgId": "string", // Unique
    "name": "string", // Required and cannot be null
    "description": "string"
  }
}
[POST] /api/organisations - A user can create their new organisation. [PROTECTED]
Request body: request body must be validated

json
Copy code
{
  "name": "string", // Required and cannot be null
  "description": "string"
}
Successful response: Return the payload below with a 201 success status code.

json
Copy code
{
  "status": "success",
  "message": "Organisation created successfully",
  "data": {
    "orgId": "string", 
    "name": "string", 
    "description": "string"
  }
}
Unsuccessful response:

json
Copy code
{
  "status": "Bad Request",
  "message": "Client error",
  "statusCode": 400
}
[POST] /api/organisations/
/users - Adds a user to a particular organisation
Request body:

json
Copy code
{
  "userId": "string"
}
Successful response: Return the payload below with a 200 success status code.

json
Copy code
{
  "status": "success",
  "message": "User added to organisation successfully"