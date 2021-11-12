"VerificationRequest": {
    "type": "object",
    "required": ["verifyToken"],
    "properties": {
      "verifyToken": {
        "type": "string",
        "description": "User's Verifytoken",
        "example": "gHVthmNL0uKA-U_EVzxdB"
      }
    }
  },
  "VerificationResponse": {
    "type": "object",
    "required": ["verifyToken"],
    "properties": {
      "verify": {
        "type": "string",
        "description": "User's name",
        "example": "true"
      },
      "VerifyToken": {
        "type": "string",
        "description": "User's verification",
        "example": "null"
      }
    }
  },  