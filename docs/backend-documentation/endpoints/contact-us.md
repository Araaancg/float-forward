# Contact Us API Routes

2. [POST](#post)

## GET

**Status**: Operative
**Description**: Gets a message from the user and sends two emails, one to the admin of the platform and one to the user to confirmt that the message was received.
**Endpoint**: `/contact-us`
**Method**: `POST`
**Requires authentication**: `False`

- **Body**:

```json
{
  "name": string,
  "email": string,
  "message": string,
}
```

- **Response**:
  **Status 200 OK**:

  ```json
  {
    "success": true
  }
  ```

  **Status 500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong when sending the message: ${e}"
  }
  ```
