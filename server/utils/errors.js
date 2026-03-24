// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

// Common error messages
const errorMessages = {
  NOT_FOUND: (resource) => `${resource} not found`,
  VALIDATION_ERROR: "Validation error",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  BAD_REQUEST: "Bad request",
  INTERNAL_ERROR: "Internal server error",
  DUPLICATE_EMAIL: "Email already exists",
  INVALID_TOKEN: "Invalid token",
  TOKEN_EXPIRED: "Token expired",
  INVALID_CREDENTIALS: "Invalid email or password",
};

// Error status codes
const errorStatusCodes = {
  NOT_FOUND: 404,
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  INTERNAL_ERROR: 500,
  DUPLICATE_EMAIL: 409,
  INVALID_TOKEN: 401,
  TOKEN_EXPIRED: 401,
  INVALID_CREDENTIALS: 401,
};

// Utility functions to throw errors
const throwError = (errorType, resource = null) => {
  const message = typeof errorMessages[errorType] === "function"
    ? errorMessages[errorType](resource)
    : errorMessages[errorType];
  const statusCode = errorStatusCodes[errorType];
  throw new AppError(message, statusCode);
};

const throwNotFoundError = (resource) => {
  throwError("NOT_FOUND", resource);
};

module.exports = {
  AppError,
  errorMessages,
  errorStatusCodes,
  throwError,
  throwNotFoundError,
};
