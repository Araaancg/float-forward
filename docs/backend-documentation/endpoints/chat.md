# Chat API Routes

1. [GET](#get)
2. [POST](#post)
3. [/read-messages](#read-messages)
4. [/unread-messages](#delete)

## GET

**Status**: Operative
**Description**: Retrieves the chats and messages of the authenticated user.
**Endpoint**: `/chats`
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
            "pin": IPin,
            "participants": [
                {
                    "user": IUser,
                    "role": "volunteer" | "seeker",
                    "lastRead": Date,
                    "_id": string
                }
            ],
            "status": "active" | "archived",
            "deletedAt": null,
            "createdAt": Date,
            "updatedAt": Date,
            "messages": [
                {
                    "_id": string | ObjectID,
                    "chatId": string | ObjectID,
                    "sender": string | ObjectID,
                    "content": string,
                    "status": "read" | "sent" | "failed",
                    "deletedAt": Date,
                    "createdAt": Date,
                    "updatedAt": Date
                }
            ]
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
    "error": "Something went wrong retriving chats: ${e}"
  }
  ```

---

## POST

**Status**: Operative
**Description**: Sends a message to a user. If the chat doesn't exist it creates the instance in db, else it just adds a new message to the Message collection.
**Endpoint**: `/chats`
**Method**: `POST`
**Requires authentication**: `True`

- **Body**:

```json
{
  "chatId": string | ObjectID, // only if chat already exists
  "pinId": string | ObjectID,
  "receiver": string | ObjectID,
  "message": string
}
```

- **Response**:
  **Status 200 OK**:

  ```json
  {
    "success": true,
    "data": {
      "_id": string | ObjectID,
      "pin": IPin,
      "participants": [
        {
            "user": IUser,
            "role": "volunteer" | "seeker",
            "lastRead": Date,
            "_id": string
        }
      ],
      "status": "active" | "archived",
      "deletedAt": null,
      "createdAt": Date,
      "updatedAt": Date,
      "messages": [
        {
            "_id": string | ObjectID,
            "chatId": string | ObjectID,
            "sender": string | ObjectID,
            "content": string,
            "status": "read" | "sent" | "failed",
            "deletedAt": Date,
            "createdAt": Date,
            "updatedAt": Date
        }
      ]
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
    "error": "Something went wrong creating the chat / message: ${e}"
  }
  ```

---

## Read Messages (Update)

**Status**: Operative
**Description**: Reads the messags not read from a chat for a user. Called generally when a user enters a chat.
**Endpoint**: `/chats`
**Method**: `PUT`
**Requires authentication**: `True`

- **Body**:

```json
{
  "chatId": string | ObjectId
}
```

- **Response**:
  **200 OK**:

  ```json
    {
    "success": true,
    "data": {
      "_id": string | ObjectID,
      "pin": IPin,
      "participants": [
        {
            "user": IUser,
            "role": "volunteer" | "seeker",
            "lastRead": Date,
            "_id": string
        }
      ],
      "status": "active" | "archived",
      "deletedAt": null,
      "createdAt": Date,
      "updatedAt": Date,
      "messages": [
        {
            "_id": string | ObjectID,
            "chatId": string | ObjectID,
            "sender": string | ObjectID,
            "content": string,
            "status": "read" | "sent" | "failed",
            "deletedAt": Date,
            "createdAt": Date,
            "updatedAt": Date
        }
      ]
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
    "error": "Chat to read not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error reading chats: ${e}"
  }
  ```

---

## Unread Messages

**Status**: Operative
**Description**: Retrieves the number of unread messages in total and per chat for a user.
**Endpoint**: `/chats`
**Method**: `GET`
**Requires authentication**: `True`

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
    "data": {
      "unreadMessagesByChat": {
        "chatId": number,
        ...
      },
      "totalUnreadCount": number
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

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "There was an error getting unread messages: ${e}"
  }
  ```
