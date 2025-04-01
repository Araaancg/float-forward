# Disasters API Routes

1. [GET](#get)
2. [POST](#post)
3. [PUT](#put)
4. [DELETE](#delete)

## GET

**Status**: Operative
**Description**: Retrieves all the information of the active disasters (don't have deletedAt). It can be filtered passing in the query params any wanted criteria.
**Endpoint**: `/disasters`
**Method**: `GET`
**Requires authentication**: `False`

- **Response**:
  **Status 200 OK**:

  ```json
  {
      "success": true,
      "data":  [{
            "_id": string,
            "title": string,
            "description": string,
            "country": string,
            "city": string,
            "coordinates": {
                "lat": number,
                "lng": number
            },
            "images": [
                {
                    "_id": string,
                    "href": string,
                    "alt": string,
                    "author": string,
                    "source": string,
                    "link": stirng,
                    "deletedAt": null,
                    "createdAt": Date,
                    "updatedAt": Date
                }
            ]
            ,
            "slug": string,
            "date": string | Date,
            "deletedAt": null,
            "createdAt": Date,
            "updatedAt": Date,
            "pins": [
                {
                    "_id": string,
                    "title": string,
                    "type": {
                        "_id": string,
                        "title": string,
                        "description": string,
                        "deletedAt": null,
                        "createdAt": Date,
                        "updatedAt": Date
                    },
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
                },
            ]
        }],
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
    "error": "Something went wrong retriving disasters: ${e}"
  }
  ```

---

## POST

**Status**: Operative
**Description**: Creates a new disaster in db, including the upload of the images to cloudinary
**Endpoint**: `/disasters`
**Method**: `POST`
**Requires authentication**: `True` // admin

- **Response**:
  **Status 200 OK**:

  ```json
  {
      "success": true,
      "data":  {
            "_id": string,
            "title": string,
            "description": string,
            "country": string,
            "city": string,
            "coordinates": {
                "lat": number,
                "lng": number
            },
            "images": [
                {
                    "_id": string,
                    "href": string,
                    "alt": string,
                    "author": string,
                    "source": string,
                    "link": stirng,
                    "deletedAt": null,
                    "createdAt": Date,
                    "updatedAt": Date
                }
            ]
            ,
            "slug": string,
            "date": string | Date,
            "deletedAt": null,
            "createdAt": Date,
            "updatedAt": Date,
            "pins": [
                {
                    "_id": string,
                    "title": string,
                    "type": {
                        "_id": string,
                        "title": string,
                        "description": string,
                        "deletedAt": null,
                        "createdAt": Date,
                        "updatedAt": Date
                    },
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
                },
            ]
        },
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
    "error": "Something went wrong creating the disaster: ${e}"
  }
  ```

---

## UPDATE

**Status**: Operative
**Description**: Update something about the disater. Provide in the body whatever needs updating and in the params (as indicated in the url) the _id of the disaster to update.
**Endpoint**: `/disasters/:id`
**Method**: `PUT`
**Requires authentication**: `True` // admin

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
      "data":  {
            "_id": string,
            "title": string,
            "description": string,
            "country": string,
            "city": string,
            "coordinates": {
                "lat": number,
                "lng": number
            },
            "images": [
                {
                    "_id": string,
                    "href": string,
                    "alt": string,
                    "author": string,
                    "source": string,
                    "link": stirng,
                    "deletedAt": null,
                    "createdAt": Date,
                    "updatedAt": Date
                }
            ]
            ,
            "slug": string,
            "date": string | Date,
            "deletedAt": null,
            "createdAt": Date,
            "updatedAt": Date,
            "pins": [
                {
                    "_id": string,
                    "title": string,
                    "type": {
                        "_id": string,
                        "title": string,
                        "description": string,
                        "deletedAt": null,
                        "createdAt": Date,
                        "updatedAt": Date
                    },
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
                },
            ]
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

  **404 Not Found**: Disaster not found

  ```json
  {
    "success": false,
    "error": "Disaster not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating disaster: ${e}"
  }
  ```

---

## DELETE

**Status**: Operative
**Description**: Delete the information of a disaster logically, this means that we are just going to fill out the timestamp deletedAt. This way we have a track record of all the disasters happened and used in the platform.
**Endpoint**: `/disasters/:id`
**Method**: `DELETE`
**Requires authentication**: `True` // admin

- **Response**:
  **200 OK**:

  ```json
  {
      "success": true,
      "data":  {
            "_id": string,
            "title": string,
            "description": string,
            "country": string,
            "city": string,
            "coordinates": {
                "lat": number,
                "lng": number
            },
            "images": [
                {
                    "_id": string,
                    "href": string,
                    "alt": string,
                    "author": string,
                    "source": string,
                    "link": stirng,
                    "deletedAt": null,
                    "createdAt": Date,
                    "updatedAt": Date
                }
            ]
            ,
            "slug": string,
            "date": string | Date,
            "deletedAt": null,
            "createdAt": Date,
            "updatedAt": Date,
            "pins": [
                {
                    "_id": string,
                    "title": string,
                    "type": {
                        "_id": string,
                        "title": string,
                        "description": string,
                        "deletedAt": null,
                        "createdAt": Date,
                        "updatedAt": Date
                    },
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
                },
            ]
        },
  }

  ```

  **401 Unauthorized**: JWT provided is malformed, expired or was not provided.

  ```json
  {
    "success": false,
    "error": "Authentication failed: ${e}"
  }
  ```

  **404 Not Found**: Disaster not found

  ```json
  {
    "success": false,
    "error": "Disaster not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error updating disaster: ${e}"
  }
  ```