# Users API Routes

1. [GET](#get)
2. [UPDATE](#update)

## GET

**Status**: Operative
**Description**: Retrieves user information form the database based on filters given in the query params. If not filters were given, then it will return all the users. For more security, this method will never return the password (even though its hashed) or the auth provider the user is registered to.
**Endpoint**: `/users`
**Method**: `GET`
**Requires authentication**: `True`

- **Response**:
  **Status 200 OK**:

  ```json
  {
      "success": true,
      "data":  {
              "_id": MongoDB ObjectID,
              "email": string,
              "name": string,
              "profilePicture": string |  null,
              "isVerified": boolean
              "createdAt": Date,
              "updatedAt": Date
          }[],
  }

  ```

  **Status 401 Unauthorized**: JWT provided is malformed, expired or was not provided.

  ```json
  {
    "success": false,
    "error": "Authentication failed: ${e}"
  }
  ```

  **Status 500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong retriving users: ${e}"
  }
  ```

---

## UPDATE

**Status**: Operative
**Description**: Update something about the user's profile. Send the updated information in the body and the token to get the \_id.
**Endpoint**: `/users`
**Method**: `PUT`
**Requires authentication**: `True`

- **Body**:

```json
{
  "profilePicture": "cool-cat.png" // example of what could be changed
}
```

- **Response**:
  **200 OK**:

  ```json
  {
      "success": true,
      "data":  {
              "_id": MongoDB ObjectID,
              "email": string,
              "name": string,
              "profilePicture": string |  null,
              "isVerified": boolean,
              "createdAt": Date,
              "updatedAt": Date
          },
  }

  ```

  **400 Bad Request**: Body not sent correctly

  ```json
  {
    "success": false,
    "error": "Information to update not provided"
  }
  ```

  **401 Unauthorized**: JWT provided is malformed, expired or was not provided.

  ```json
  {
    "success": false,
    "error": "Authentication failed: ${e}"
  }
  ```

  **404 Not Found**: User not found

  ```json
  {
    "success": false,
    "error": "User not found"
  }
  ```

  **409 Conflict**: Values duplicate in db

  ```json
  {
    "success": false,
    "error": "Email is already taken"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating user: ${e}"
  }
  ```
