# Authentication API Routes

1. [Register](#register)
2. [Login](#login)
3. [Refresh](#refresh)
4. [Logout](#logout)
5. [Forgot Password](#forgot-password)
6. [Reset Password](#reset-password)
7. [Verify Email](#verify-email)
9. [Is Verified](#is-verified)

## Register

**Status**: Operative
**Description**: Registers a user in case they use credentials. It creates the user in db and returns the access and refresh tokens needed for authentication. It also sends the link to email provided to verify it.
**Endpoint**: `/auth/register`
**Method**: `POST`
**Requires authentication**: `false`

- **Body**:

```json
{
  "email": "user@example.com",
  "name": "User Example",
  "password": "password123",
  "confirmPassword": "password123",
  "provider": "credentials"
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
              "name": string,
              "profilePicture": string |  null,
              "isVerified": boolean,
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
    "error": "Invalid input"
  }
  ```

  **409 Conflict**: Email already in use.

  ```json
  {
    "success": false,
    "error": "Email already in use"
  }
  ```

  **409 Conflict**: Passwords don't match or email is already in use.

  ```json
  {
    "success": false,
    "error": "Passwords must be the same"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "when registering the user: ${e}"
  }
  ```

---

## Login

**Status**: Operative
**Description**: Authenticates the user with provided credentials and returns JWT tokens for session management. There are two types of login in this platform, the credentials and the Google token one.
**Endpoint**: `/auth/login`
**Method**: `POST`
**Requires authentication**: `false`

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
              "name": string,
              "profilePicture": string |  null,
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
    "error": "Email or password missing"
  }
  ```

  **404 Not Found**: Email not found (only in credentials login).

  ```json
  {
    "success": false,
    "error": "User not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong when logging the user with [provider]: ${e}"
  }
  ```

---

## Refresh

**Status**: Operative
**Description**: Receives a refresh token, verifies it is not expired and generates new access tokens. This system is for added security in the requests.
**Endpoint**: `/auth/refresh`
**Method**: `POST`
**Requires authentication**: `true` // refresh token

- **Body**:

```json
{
  "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXV..."
}
```

- **Response**:
  **200 OK**:

  ```json
  {
      "success": true,
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

  **400 Bad Request**: Refresh token not provided

  ```json
  {
    "success": false,
    "error": "Refresh token not provided"
  }
  ```

  **401 Unauthorize**: Refresh token expired

  ```json
  {
    "success": false,
    "error": "Refresh token"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false
  }
  ```

---

## Forgot Password

**Status**: Operative
**Description**: This enpoint is in charge of sending a link the user's email in case they forgot their password, so they can reset it. Only available if the provider is "credentials". Send the wanted email in the body.
**Endpoint**: `/auth/forgot-password`
**Method**: `POST`
**Requires authentication**: `false`

- **Body**:

```json
{
  "email": "example@mail.com"
}
```

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
    "data": "eyJhbGciOiJSUzI1N..."
    // should send an email too with the link to reset the password
  }
  ```

  **400 Bad Request**: EMail not provided

  ```json
  {
    "success": false,
    "error": "Email was not provided"
  }
  ```

  **404 Not Found**: Email not registered in db.

  ```json
  {
    "success": false,
    "error": "User not found. Email is not registered in the platform"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong when resetting the password ${e}"
  }
  ```

---

## Reset Password

**Status**: Operative
**Description**: Using the token sent with forgot-password flow, this endpoint verifies that token is still valid and then changes the password to the new one the user setted.
**Endpoint**: `/auth/reset-password`
**Method**: `POST`
**Requires authentication**: `false`

- **Body**:

```json
{
  "email": "example@mail.com",
  "password": "1234",
  "confirmPassword": "1234",
  "resetPasswordToken": "eyJhbGciOiJSUzI1NiIsInR..."
}
```

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
    "data": "eyJhbGciOiJSUzI1N..."
    // should send an email too with the link to reset the password
  }
  ```

  **400 Bad Request**: Some information from the body not provided

  ```json
  {
    "success": false,
    "error": "All information was not provided"
  }
  ```

  **401 Unauthorized**: Rest password token is not valid

  ```json
  {
    "success": false,
    "error": "Reset password token is not valid"
  }
  ```

  **404 Not Found**: Email not registered in db.

  ```json
  {
    "success": false,
    "error": "User not found"
  }
  ```

  **409 Conflict**: Passwords must be the same

  ```json
  {
    "success": false,
    "error": "Passwords must be the same"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong when resetting the password ${e}"
  }
  ```

---

## Verify Email

**Status**: Operative
**Description**: This enpoint verifies the email of a user based on a token provided
**Endpoint**: `/auth/verify-email`
**Method**: `POST`
**Requires authentication**: `true` // verifyEmailToken necessary

- **Body**:

```json
{
  "email": "example@mail.com",
  "verifyEmailToken": "eyJhbGciOiJSUzI1NiIsInR..."
}
```

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
  }
  ```

  **400 Bad Request**: Some information from the body not provided

  ```json
  {
    "success": false,
    "error": "Email or token not provided"
  }
  ```

  **401 Unauthorized**: Verify email token not valid

  ```json
  {
    "success": false,
    "error": "Verify email token is not valid"
  }
  ```

  **404 Not Found**: Email not registered in db.

  ```json
  {
    "success": false,
    "error": "User not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong when verifying the email: ${e}"
  }
  ```

---

## Is Verified

**Status**: Operative
**Description**: This enpoint verifies the email of a user based on a token provided
**Endpoint**: `/auth/is-verified`
**Method**: `GET`
**Requires authentication**: `true` // accessToken

- **Response**:
  **200 OK**:

  ```json
  {
    "success": true,
  }
  ```

  **401 Unauthorized**: Verify email token not valid

  ```json
  {
    "success": false,
    "error": "Verify email token is not valid"
  }
  ```

  **404 Not Found**: Email not registered in db.

  ```json
  {
    "success": false,
    "error": "User not found"
  }
  ```

  **500 Internal Server Error**: Internal server error.

  ```json
  {
    "success": false,
    "error": "Something went wrong when verifying the email: ${e}"
  }
  ```

---