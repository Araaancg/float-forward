# Applications First Responder API Routes

1. [GET](#get)
2. [POST](#post)
3. [PUT](#put)
4. [DELETE](#delete)

## GET

**Status**: Operative
**Description**: Retrieves all applications. It can be filtered using the query params.
**Endpoint**: `/applications`
**Method**: `GET`
**Requires authentication**: `True`

- **Response**:
  **Status 200 OK**:

  ```json
  {
    "success": true,
    "data": [
      {
        "_id": string | ObjectID,
        "file": string,
        "user": IUser,
        "status": "submitted" | "approved" | "rejected",
        "organization": string,
        "role": string,
        "reference": string,
        "deletedAt": Date,
        "createdAt": Date,
        "updatedAt": Date
      }
    ]
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
    "error": "Something went wrong retriving application : ${e}"
  }
  ```

---

## POST

**Status**: Operative
**Description**: Creates a new application in db, it also uploads the credentials to Google Cloud Storage (buckets)
**Endpoint**: `/applications`
**Method**: `POST`
**Requires authentication**: `True`

- **Body**:

```json
  {
    "name": string,
    "organization": string,
    "role": string
  }
```

- **Response**:
  **Status 200 OK**:

  ```json
  {
    "success": true,
    "data": {
        "_id": string | ObjectID,
        "file": string,
        "user": IUser,
        "status": "submitted" | "approved" | "rejected",
        "organization": string,
        "role": string,
        "reference": string,
        "deletedAt": Date,
        "createdAt": Date,
        "updatedAt": Date
      }
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
    "error": "Something went wrong creating the application: ${e}"
  }
  ```

---

## UPDATE

**Status**: Operative
**Description**: Updates the application. Mainly used for updating the status of the application.
**Endpoint**: `/applications/:id`
**Method**: `PUT`
**Requires authentication**: `True`

- **Body**:

```json
{
  "title": "New Name" // example of what could be changed
}
```

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
    "data": {
        "_id": string | ObjectID,
        "file": string,
        "user": IUser,
        "status": "submitted" | "approved" | "rejected",
        "organization": string,
        "role": string,
        "reference": string,
        "deletedAt": Date,
        "createdAt": Date,
        "updatedAt": Date
      }
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

  **404 Not Found**: Pin not found

  ```json
  {
    "success": false,
    "error": "Application to update not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating application: ${e}"
  }
  ```

---

## DELETE

**Status**: Operative
**Description**: Delete the information of a application logically, this means that we are just going to fill out the timestamp deletedAt. This way we have a track record of all the applications registered in the platform.
**Endpoint**: `/pins/:id`
**Method**: `DELETE`
**Requires authentication**: `True`

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
    "data": {
        "_id": string | ObjectID,
        "file": string,
        "user": IUser,
        "status": "submitted" | "approved" | "rejected",
        "organization": string,
        "role": string,
        "reference": string,
        "deletedAt": Date,
        "createdAt": Date,
        "updatedAt": Date
      }
  }
  ```

  **401 Unauthorized**: JWT provided is malformed, expired or was not provided.

  ```json
  {
    "success": false,
    "error": "Authentication failed: ${e}"
  }
  ```

  **404 Not Found**: Application not found

  ```json
  {
    "success": false,
    "error": "Application type not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating application: ${e}"
  }
  ```
