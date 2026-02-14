# MERN Invoice Generation AI - Backend

## Project Overview
Backend API for MERN Invoice Generation AI application with authentication, file handling, and database management.

## Dependencies

### Core Framework & HTTP
| Package | Version | Purpose |
|---------|---------|---------|
| **express** | Latest | Web framework for building REST APIs and handling HTTP requests/responses |
| **body-parser** | Latest | Parse incoming request bodies (JSON, URL-encoded data) |
| **cors** | Latest | Enable Cross-Origin Resource Sharing (allow frontend to communicate with backend) |

### Authentication & Security
| Package | Version | Purpose |
|---------|---------|---------|
| **jsonwebtoken** | Latest | Create and verify JWT tokens for user authentication |
| **bcryptjs** | Latest | Hash and compare passwords securely |

### Database
| Package | Version | Purpose |
|---------|---------|---------|
| **mongoose** | Latest | MongoDB object modeling for database operations |

### File Handling & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| **multer** | Latest | Handle file uploads (for invoice documents/images) |
| **validator** | Latest | Validate and sanitize input data (emails, strings, etc.) |

### Environment & Development
| Package | Version | Purpose |
|---------|---------|---------|
| **dotenv** | Latest | Load environment variables from `.env` file (API keys, database URLs, etc.) |
| **nodemon** | Latest | Auto-restart the development server when code changes |

## Installation

```bash
npm install
```

Or install all dependencies at once:
```bash
npm i bcryptjs body-parser cors dotenv express jsonwebtoken mongoose multer nodemon validator
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Environment Variables

Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## Project Structure

```
backend/
├── models/          # Mongoose schemas
├── routes/          # API endpoints
├── controllers/     # Business logic
├── middleware/      # Custom middleware (authentication, validation)
├── config/          # Configuration files
├── .env             # Environment variables
└── server.js        # Entry point
```

## API Features

- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **File Uploads** - Handle invoice documents and images with multer
- **Data Validation** - Input validation using validator library
- **MongoDB Integration** - Data persistence with mongoose ODM
- **CORS Support** - Allow cross-origin requests from frontend
- **Error Handling** - Centralized error handling and logging
