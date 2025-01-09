# Authentication API Routes

1. [Register](#register)
2. [Login](#login)

## Register

**Status**: Operative
**Description**: Registers a user in case they use credentials. It creates the user in db and returns the access and refresh tokens needed for authentication.
**Endpoint**: `/auth/register`
**Method**: `POST`

- **Body**:
```json
{
    "email": "user@example.com",
    "name": "User Example",
    "password": "password123",
    "confirmPassword": "password123",
    "provider": "credentials",
}
```

- **Response**:
  **200 OK**:
    ```json
    {
        "success": true,
        "user":  {
                "_id": MongoDB ObjectID,
                "email": string,
                "fullName": string,
                "profileImage": string |  null,
                "password": null,
                "authProvider": "google" | "credentials",
                "createdAt": Date,
                "updatedAt": Date
            },
        "access": {
            "token": "eyJhbGciOiJSUzI1NiIsInR...",
            "expires": Date
        },
        "refresh": {
            "token": "eyJhbGciOiJSUzI1NiIsInR...",
            "expires": Date
        }

    }

    ```
  **400 Bad Request**: Invalid input or missing fields.
    ```json
    {
        "success": false,
        "status": 400,
        "error": "Invalid input"
    }
    ```
  **401 Unauthorized**: Passwords don't match or email is already in use.
    ```json
    {
        "success": false,
        "status": 401,
        "error": "Authentication failed"
    }
    ```
  **500 Internal Server Error**: General server error.
    ```json
    {
        "success": false,
        "status": 500,
        "error": "Server error, please try again later"
    }
    ```

---

## Login

**Status**: Operative
**Description**: Authenticates the user with provided credentials and returns JWT tokens for session management. There are two types of login in this platform, the credentials and the Google token one.
**Endpoint**: `/auth/login`
**Method**: `POST`

- **Body**:
```json
// For the credentials login
{
    "email": "user@example.com",
    "password": "password123",
    "provider": "credentials",
}

// For the login with Google
// We create user in db in case they don't exist - ONLY IN GOOGLE LOGIN
{
    "email": "user@example.com",
    "name": "Some Name",
    "picture": "url.com" | null,
    "provider": "google",
    "token": "eyJhbGciOiJSUzI1NiIsInR..." // Google token provided by authJS in the front
}
```

- **Response**:
  **200 OK**:
    ```json
    {
        "success": true,
        "user":  {
                "_id": MongoDB ObjectID,
                "email": string,
                "fullName": string,
                "profileImage": string |  null,
                "password": null,
                "authProvider": "google" | "credentials",
                "createdAt": Date,
                "updatedAt": Date
            },
        "access": {
            "token": "eyJhbGciOiJSUzI1NiIsInR...",
            "expires": Date
        },
        "refresh": {
            "token": "eyJhbGciOiJSUzI1NiIsInR...",
            "expires": Date
        }

    }

    ```
  **400 Bad Request**: Invalid input or missing fields.
    ```json
    {
        "success": false,
        "status": 400,
        "error": "Invalid input"
    }
    ```
  **401 Unauthorized**: Incorrect email or password.
    ```json
    {
        "success": false,
        "status": 401,
        "error": "Authentication failed"
    }
    ```
  **404 Unauthorized**: Email not found (only in credentials login).
    ```json
    {
        "success": false,
        "status": 404,
        "error": "User not found"
    }
    ```
  **500 Internal Server Error**: General server error.
    ```json
    {
        "success": false,
        "status": 500,
        "error": "Server error, please try again later"
    }
    ```

---