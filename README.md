## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```



## API Documentation

Swagger UI is available at: [http://localhost:3000/api](http://localhost:3000/api)

Use this endpoint to explore and test all available APIs.



## Sample Workflow Payload

```json
{
    "id": 3,
    "name": "abcd",
    "userId": 1,
    "components": [
        {
            "id": "ftu0eo4wr",
            "icon": "📥",
            "type": "input",
            "color": "#10b981",
            "title": "Input Node",
            "config": {
                "inputType": "text",
                "placeholder": "Enter value"
            },
            "position": {
                "x": 85,
                "y": 77.5
            }
        },
        {
            "id": "gpxsjeqb6",
            "icon": "📤",
            "type": "output",
            "color": "#3b82f6",
            "title": "Output Node",
            "config": {
                "outputFormat": "json"
            },
            "position": {
                "x": 307,
                "y": 289.5
            }
        }
    ],
    "connections": [
        {
            "id": "cw6hdmk1y",
            "to": "gpxsjeqb6",
            "from": "ftu0eo4wr",
            "toType": "top",
            "fromType": "bottom"
        }
    ],
    "configurations": null,
    "createdAt": "2025-06-28T17:48:22.921Z",
    "updatedAt": "2025-06-28T17:48:22.921Z"
}
```
