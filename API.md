## Base URL
`http://localhost:8000/api/`

## Error Responses
All end points may return these error responses:
``` json
{
    "message": "Error message here",
    "errors":[]
}
```
Common error status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Endpoints

## Authentication

1. **`POST /api/auth/register`** : Register User.

**Request body**
```json
{
    "fullname":"your fullname",
    "email":"your email",
    "password":"your password"
}
```
**Response: `200 OK`**
```json
{
    "message":"User Registered Successfully.",
    "response":{
        "fullname":"your fullname",
        "email":"your email",
        "password":"your hashed password"
    }
}
```
2. **`POST /api/auth/login`** : Login User.

**Request body**
```json
{
    "email":"your email",
    "password":"your password"
}
```
**Response: `200 OK`**
```json
{
    "message":"User Logged In Successfully.",
    "token":"Your token",
    "user":{
        "fullname":"your fullname",
        "email":"your email",
        "password":"your hashed password"
    }
}
```
3. **`POST /api/auth/logout`** : Logout User.

**Response: `200 OK`**
```json
{
    "message":"User Logged out Successfully.",
}
```
## Task
1. **`GET /api/tasks` : Get All Task**

**Response: `200 OK`**
```json
{
    "message":"Task fetched successfully.",
    "response":[
        {
            "added_by":"userId",
            "title":"task title",
            "description":"task description",
            "status": "task status",
            "due_date":"task due date."
        }
    ]
}
```
2. **`GET /api/tasks/:id` : Get Task By Id**

**Response: `200 OK`**
```json
{
    "message":"Task fetched successfully.",
    "response":{
        "added_by":"userId",
        "title":"task title",
        "description":"task description",
        "status": "task status",
        "due_date":"task due date."
    }
}
```
3. **`POST /api/tasks` : Create Task**

**Request body**

```json
{
    "title":"task title",
    "description":"task description",
    "status": "task status",
    "due_date":"task due date."
}
```
**Response: `200 OK`**
```json
{
    "message": "Task Created Successfully.",
    "response": {
        "added_by": "user id",
        "title": "your title",
        "description": "your description",
        "status": "your status",
        "due_date": "Your due date",
    }
}
```
4. **`PUT /api/tasks/:id` : Update Task**

**Request body**

```json
{
    "title":"task title",
    "description":"task description",
    "status": "task status",
    "due_date":"task due date."
}
```

**Response: `200 OK`**
```json
{
    "message": "Task Updated Successfully.",
    "response": {
        "added_by": "user id",
        "title": "your title",
        "description": "your description",
        "status": "your status",
        "due_date": "Your due date",
    }
}
```
5. **`DELETE /api/tasks/:id` : Delete Task**

**Response: `200 OK`**
```json
{
    "message": "Task Removed.",
    "response": {
        "added_by": "user id",
        "title": "your title",
        "description": "your description",
        "status": "your status",
        "due_date": "Your due date",
    }
}
```