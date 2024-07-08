# API Documentation

## How to setup

### Configure server
- Use a database web service of your preference, Example: supabase.com
- Create a project with postgreSQL as database
- create a .env as the .env.example and insert your database data there (to run local)
- run the consultas.sql queries to create the tables

### Configure API service
- Use your web service of preference. Example: render.com
- Create a new web service instance and link your project with it
- insert .env.example variables with the database fields in enviroment variables to connect with database
- deploy

## Endpoints

## Authentication Methods

### Login

**POST /login**

Logs in a user and sets a session.

- **Request Body:**
  - `email`: User's email (string)
  - `password`: User's password (string)

- **Response:**
  - Status 200: User information and session token
  - Status 404: User not found
  - Status 401: Invalid password

### Register

**POST /register**

Registers a new user.

- **Request Body:**
  - `name`: User's name (string)
  - `email`: User's email (string, max 50 characters)
  - `password`: User's password (string)

- **Response:**
  - Status 200: Newly created user
  - Status 422: Validation error
  - Status 409: Email already exists

### Logout

**POST /logout**

Logs out the current user.

- **Response:**
  - Status 204: Successful logout

## Session Methods

### Create Session

**POST /createSession**

Creates a new session.

- **Request Body:**
  - `sesion_name`: Name of the session (string)

- **Response:**
  - Status 200: Newly created session
  - Status 401: Unauthorized
  - Status 422: Validation error

### Delete Session

**DELETE /deleteSession/:id**

Deletes a session by ID.

- **Request Parameters:**
  - `id`: ID of the session to be deleted

- **Response:**
  - Status 204: Successful deletion
  - Status 401: Unauthorized
  - Status 404: Session not found

### Update Session

**PATCH /updateSession/:id**

Updates a session by ID.

- **Request Parameters:**
  - `id`: ID of the session to be updated

- **Request Body:**
  - `sesion_name`: New name of the session (string)

- **Response:**
  - Status 200: Updated session
  - Status 401: Unauthorized
  - Status 422: Validation error
  - Status 404: Session not found

## Task Methods

### Create Task

**POST /createTask**

Creates a new task.

- **Request Body:**
  - `task_name`: Name of the task (string)
  - `task_description`: Description of the task (string)
  - `sesion_id`: ID of the session to which the task belongs (number)

- **Response:**
  - Status 200: Newly created task
  - Status 401: Unauthorized
  - Status 422: Validation error

### Delete Task

**DELETE /deleteTask/:id**

Deletes a task by ID.

- **Request Parameters:**
  - `id`: ID of the task to be deleted

- **Response:**
  - Status 204: Successful deletion
  - Status 404: Task not found

### Update Task

**PATCH /updateTask/:id**

Updates a task by ID.

- **Request Parameters:**
  - `id`: ID of the task to be updated

- **Request Body:**
  - `task_name`: New name of the task (string)
  - `task_description`: New description of the task (string)

- **Response:**
  - Status 200: Updated task
  - Status 401: Unauthorized
  - Status 422: Validation error
  - Status 404: Task not found

### Move Task

**PATCH /moveTask/:id**

Moves a task to a different session.

- **Request Parameters:**
  - `id`: ID of the task to be moved

- **Request Body:**
  - `destination_sesion_id`: ID of the destination session (number)

- **Response:**
  - Status 200: Moved task
  - Status 401: Unauthorized
  - Status 404: Session or task not found

## User Methods

### Get Users

**GET /users**

Retrieves all users.

- **Response:**
  - Status 200: List of users

### Get User by ID

**GET /users/:id**

Retrieves a user by ID.

- **Request Parameters:**
  - `id`: ID of the user to be retrieved

- **Response:**
  - Status 200: User information
  - Status 404: User not found

### Delete User

**DELETE /users/:id**

Deletes a user by ID.

- **Request Parameters:**
  - `id`: ID of the user to be deleted

- **Response:**
  - Status 204: Successful deletion
  - Status 404: User not found

### Update User

**PUT /users/:id**

Updates a user by ID.

- **Request Parameters:**
  - `id`: ID of the user to be updated

- **Request Body:**
  - `name`: New name of the user (string)
  - `email`: New email of the user (string, max 50 characters)
  - `password`: New password of the user (string)

- **Response:**
  - Status 200: Updated user
  - Status 404: User not found
