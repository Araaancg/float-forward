# Pin API Routes

1. [GET](#get)
2. [POST](#post)
3. [PUT](#put)
4. [DELETE](#delete)

## GET

**Status**: Operative
**Description**: Retrieves all the pins. It can be filtered passing in the query params any wanted criteria.
**Endpoint**: `/pins`
**Method**: `GET`
**Requires authentication**: `True`

- **Response**:
  **Status 200 OK**:

  ```json
  {
    "success": true,
    "data": [
      {
        "_id": string,
        "title": string,
        "type": IPinType,
        "description": string,
        "disaster": string,
        "user": IUser,
        "coordinates": {
          "lat": number,
          "lng": number,
        },
        "address": string,
        "deletedAt": null,
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
    "error": "Something went wrong retriving pin : ${e}"
  }
  ```

---

## POST

**Status**: Operative
**Description**: Creates a new pin type in db
**Endpoint**: `/pins`
**Method**: `POST`
**Requires authentication**: `True`

- **Response**:
  **Status 200 OK**:

  ```json
  {
      "success": true,
      "data":  {
        "_id": string,
        "title": string,
        "type": IPinType,
        "description": string,
        "disaster": string,
        "user": IUser,
        "coordinates": {
          "lat": number,
          "lng": number,
        },
        "address": string,
        "deletedAt": null,
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
    "error": "Something went wrong creating the pin: ${e}"
  }
  ```

---

## UPDATE

**Status**: Operative
**Description**: Update something about the pin type. Provide in the body whatever needs updating and in the params (as indicated in the url) the _id of the pin to update.
**Endpoint**: `/pins/:id`
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
      "data":  [{
        "_id": string,
        "title": string,
        "type": IPinType,
        "description": string,
        "disaster": string,
        "user": IUser,
        "coordinates": {
          "lat": number,
          "lng": number,
        },
        "address": string,
        "deletedAt": null,
        "createdAt": Date,
        "updatedAt": Date
      }],
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
    "error": "Pin to update not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating pin: ${e}"
  }
  ```

---

## DELETE

**Status**: Operative
**Description**: Delete the information of a pin logically, this means that we are just going to fill out the timestamp deletedAt. This way we have a track record of all the pins registered in the platform.
**Endpoint**: `/pins/:id`
**Method**: `DELETE`
**Requires authentication**: `True`

- **Response**:
  **200 OK**:

  ```json
  {
      "success": true,
      "data":  [{
        "_id": string,
        "title": string,
        "type": IPinType,
        "description": string,
        "disaster": string,
        "user": IUser,
        "coordinates": {
          "lat": number,
          "lng": number,
        },
        "address": string,
        "deletedAt": null,
        "createdAt": Date,
        "updatedAt": Date
      }],
  }

  ```

  **401 Unauthorized**: JWT provided is malformed, expired or was not provided.

  ```json
  {
    "success": false,
    "error": "Authentication failed: ${e}"
  }
  ```

  **404 Not Found**: Pin type not found

  ```json
  {
    "success": false,
    "error": "Pin type not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating pin type: ${e}"
  }
  ```
