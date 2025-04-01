# AIDNET | Community-based disaster handling platform

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Documentation](#documentation)
5. [Deployment](#deployment)

## Introduction

This project is a full-stack web application designed as a community-based platform to organize resources in the case of a natural disaster. It allows users to post needs or offers with services as well as get in contact with first responders who have disaster management skills.

This project is built in two main parts, the frontend using NextJS and the backend using NodeJS with express. All throughtout the project, TypeScript was used to ensure better typing.

## Getting Started

### Prerequisites

- Node.js
- MongDB 
- Environmental variables. Take the .env.example file in each part: frontend and backend

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

- [Architecture & Technologies](./docs/architecture-and-technologies.md)
- [Database Schema](./docs/database-schema.md)
- [API Documentation](./docs/backend-documentation/api-intro.md)
