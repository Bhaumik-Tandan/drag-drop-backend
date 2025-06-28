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

## Environment Variables

Create a `.env` file in the project root with the following content:

```env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_jwt_secret"
```

- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `JWT_SECRET`: A secret key for signing JWT tokens.

## Why PostgreSQL?

PostgreSQL is used as the database for this project because it offers:

- **ACID Transactions:** Ensures reliable and consistent data operations, which is important for workflows and user management.
- **Native JSON Support:** Allows storing and querying JSON data efficiently, which is ideal for flexible workflow components and configurations.
- **Scalability & Performance:** Handles complex queries and large datasets efficiently.

This makes PostgreSQL a great fit for applications that require both transactional integrity and flexible data structures.
