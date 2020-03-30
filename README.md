# fancy-to-do

Todo list features
Create Todo
Show Todo List
Edit Todo
Delete Todo

## RESTful endpoints

### GET /todos

> Get all todos

_Request Header_

```

```

_Request Body_

```
empty
```

_Response (200)_

```
{
    "todos": [
        {
            "id": 3,
            "title": "todo list",
            "description": "coding todo",
            "status": "done",
            "due_date": "2020-04-02T00:00:00.000Z",
            "createdAt": "2020-03-30T08:50:10.004Z",
            "updatedAt": "2020-03-30T08:53:04.786Z"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```

```

---

### POST /todos

> Create new todo

_Request Header_

```

```

_Request Body_

```
{
  "title": "<title>",
  "description": "<description>"
  "status": "<status>"
  "due_date": "<due_date>"
}
```

_Response (201 - Created)_

```
{
    "data": {
        "id": <given id by system>,
        "title": "<title>",
        "description": "<description>",
        "status": "<status>",
        "due_date": "<due_date>",
        "updatedAt": "2020-03-30T08:50:10.004Z",
        "createdAt": "2020-03-30T08:50:10.004Z"
    }
}
```

_Response (400 - Bad Request)_

```
{
  "message": "<key> cannot be empty"
}
```

_Response (500 - Internal Server Error)_

```

```

---

### GET /todos/:id

> Get todo by id

_Request Header_

```

```

_Request Body_

```

```

_Response (200)_

```
{
    "data": {
        "id": 3,
        "title": "todo list",
        "description": "coding todo",
        "status": "done",
        "due_date": "2020-04-02T00:00:00.000Z",
        "createdAt": "2020-03-30T08:50:10.004Z",
        "updatedAt": "2020-03-30T08:53:04.786Z"
    }
}
```

_Response (404 - Not found)_

```
{
  "message": "Error, data not found"
}
```

_Response (500 - Internal Server Error)_

```

```

---

### PUT /todos/:id

> Edit todo by id

_Request Header_

```

```

_Request Body_

```
{
  "title": "<title>",
  "description": "<description>"
  "status": "<status>"
  "due_date": "<due_date>"
}
```

_Response (200)_

```
{
    "data": {
        "id": <given id by system>,
        "title": "<title>",
        "description": "<description>",
        "status": "<status>",
        "due_date": "<due_date>",
        "updatedAt": "2020-03-30T08:50:10.004Z",
        "createdAt": "2020-03-30T08:50:10.004Z"
    }
}
```

_Response (400 - Bad Request)_

```
{
  "message": "<key> cannot be empty"
}
```

_Response (404 - Not found)_

```
{
  "message": "Error, data not found"
}
```

_Response (500 - Internal Server Error)_

```

```

---

### Delete /todos/:id

> Delete todo by id

_Request Header_

```

```

_Request Body_

```

```

_Response (200)_

```
{
    "data": {
        "id": <given id by system>,
        "title": "<title>",
        "description": "<description>",
        "status": "<status>",
        "due_date": "<due_date>",
        "updatedAt": "2020-03-30T08:50:10.004Z",
        "createdAt": "2020-03-30T08:50:10.004Z"
    }
}
```

_Response (404 - Not found)_

```
{
  "message": "Error, data not found"
}
```

_Response (500 - Internal Server Error)_

```

```
