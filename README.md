# Task Manager API
This api is scalable api built with class based approach for api development and follows layered architecture.

## Overview
This api can be use for managing task and becoming more productive. Users can get only their task, update and remove only their task.

## Tech Stack In Use
- Express
- Typescript
- zod (for validation)
- other library: `jsonwebtoken`, `bcryptjs`, `mongoose`

## API EndPoints
- **Authentication**
    - `POST /api/auth/register` - Register user.  
    - `POST /api/auth/login` - Login user.
    - `POST /api/auth/logout` - Logout user.
- **Task manager**
    - `GET /api/tasks/` - Get All tasks.
    - `GET /api/tasks/:id` - Get task by id.
    - `POST /api/tasks` - Create task.
    - `PUT /api/tasks/:id` - Update task.
    - `DELETE /api/tasks/:id` - Delete task.

[API ENDPOINT](./API.md) - for more detail on api endpoints.

## Getting Started
Follow these steps to setup and run the project

### Running the Application
1. Clone the Repository (if you haven't already):
```bash
git clone https://github.com/uniquemj/TaskManager-OOP
```
2. Open folder and Install the required dependencies:
```bash
cd TaskManager-OOP
npm install
```
3. Set Up few varaibles in .env
```js
PORT=<Your_PORT>
MONGODB_URL=<YOUR_MONGODB_URL>
JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
```

4. To use this project
```bash
npm run start
```