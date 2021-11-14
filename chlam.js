"post": {
    "tags": ["Users"],
    "summary": "User logout",
    "parameters": [],
    "security": [
      {
        "BearerAuth": []
      }
    ],
    "responses": {
      "200": {
        "description": "Success logout"
      },
      "401": {
        "description": "Not authorized",
        "content": {}
      },
      "500": {
        "description": "Server error",
        "content": {}
      }
    }
  }