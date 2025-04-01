# API Documentation

This API is built using **Node.js**, **Express**, and **JWT** for authentication. It provides various services for [your project] and follows a modular architecture that separates concerns to enhance maintainability, debugging, and scalability.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [API Structure](#api-structure)
   - [index.ts](#indexts)
   - [worker.ts](#workerts)
   - [app.ts](#appts)
   - [common folder](#common-folder)
   - [models folder](#models-folder)
   - [api folder](#api-folder)
3. [Endpoint Documentation](#endpoint-documentation)

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web application framework for Node.js to handle HTTP requests and routes.
- **JWT (JSON Web Tokens)**: For handling secure authentication and managing user sessions.

## API Structure

### index.ts

This is the **entry point** of the API. It sets up the initial configuration for the server and connects the rest of the system together. It initializes the server by calling `worker.ts`.

### worker.ts

The **worker** file is responsible for creating and configuring the server. It separates the server logic from the actual Express application (`app.ts`), which allows for better flexibility, testing, and debugging.

### app.ts

The **app.ts** file holds the Express application setup. This is where all routes and middleware are defined. It’s where the server receives and handles incoming requests and prepares the response. Start of the api routing.

---

### Common Folder

The `common` folder contains utility functions, middleware, and other reusable code snippets that are used throughout the application.

- **helpers**: 
   - `encryption-manager.ts`: Handles password encryption and decryption for user authentication.
   - `catch-async.ts`: A utility function to handle asynchronous operations and catch errors, simplifying error handling in the controllers.
   
- **middlewares**: 
   - `auth-handler.ts`: Middleware that ensures certain routes are accessible only to authenticated users. It checks the JWT token and validates user access.
   - `error-handler.ts`: Custom error handler that intercepts errors thrown throughout the application and formats them for the client. It ensures all errors are handled consistently and allows for easier debugging.

- **routes.ts**: Contains the mapping of API endpoints. This file imports all the routes from the `api` folder and makes them available under specific path prefixes.
- **mongodb-init.ts**: Initializes the MongoDB database connection using Mongoose.

---

### Models Folder

The `models` folder houses all the Mongoose ORM models. These models are used to interact with the MongoDB database, defining schemas, validation rules, and other configurations for the data stored in the database.

- Each model corresponds to a specific collection in the database.
- For more detailed information about each schema, please refer to the [database-schema.md](../database-schema.md) file.

---

### API Folder

The `api` folder is where the core business logic resides. It is divided into several subfolders to maintain separation of concerns:

- **routes**: Contains all the route definitions for the various API endpoints.
- **controllers**: Contains logic that handles the HTTP request-response cycle. Controllers fetch data, handle business logic, and return responses.
- **services**: These contain more specific operations or functions that the controllers call. This could be interacting with the database, performing complex operations, or interacting with external APIs.

---

## Endpoint Documentation

All the endpoint documentation can be looked in the `/endpoints/` folder where this folder is located at. Here is a list of all the different categories of endpoints that this API handles.

- [Authentication](./endpoints/authentication.md)
- [Users](./endpoints/users.md)
- [Disasters](./endpoints/disasters.md)
- [Pin](./endpoints/pins.md)
- [Pin Types](./endpoints/pin-types.md)