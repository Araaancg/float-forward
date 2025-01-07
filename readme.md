# AIDENT | Community-based disaster handling platform

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Documentation](#documentation)
   - [Architecture & Technologies](#architecture--technologies)
   - [Database Schema](#database-schema)
   - [API Documentation](#api-documentation)
5. [Deployment](#deployment)

## Introduction

This project is a full-stack web application designed as a community-based platform to organize resources in the case of a natural disaster. It allows users to post needs or offers with services as well as get in contact with first responders who have disaster management skills.

This project is built in two main parts, the frontend using NextJS and the backend using NodeJS with express. All throughtout the project, TypeScript was used to ensure better typing.

## Getting Started

### Prerequisites

- Node.js
- MongDB 
- The following environmental variables (.env file)

```
# Authentication with authJS + Google
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# General variables to handle integration
DEVELOPMENT=
API_PREFIX=api/v1
API_URL_DEV="http://localhost:8000"
API_URL_PROD=


# Database uri connection
MONGODB_URI=

# JWT handling
JWT_PUBLIC_KEY=
JWT_PRIVATE_KEY=
JWT_ACCESS_EXPIRATION_MINUTES=30 
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=15 
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Araaancg/brookes-dissertation.git
```

2. Got to each project's part (frontend and backend) and isntall npm packages `npm install`

3. Run in each part: `npm run dev`

4. Open `http://localhost:3000` in the browser to have acces to the frontend. 

## Documentation
For further documentation on the project, please read the following documents that can be found in the `/docs/` folder in the project root.

- [Architecture & Technologies](./docs/architecture-and-tecnologies.md)
- [Database Schema](./docs/database-schema.md)
- [API Documentation](./docs/backend-documentation/api-intro.md)

## Deployment
This project is deployed...