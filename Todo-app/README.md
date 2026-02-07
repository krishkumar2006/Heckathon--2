# Full Stack Todo Application

A comprehensive full-stack todo application built with Next.js (frontend) and FastAPI (backend) featuring user authentication, task management, and real-time updates.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Features
- User authentication with JWT tokens
- Create, read, update, and delete tasks
- Task filtering and sorting capabilities
- Priority levels and due dates
- Responsive design for all device sizes
- Secure API endpoints with authentication middleware

## Tech Stack
### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth for authentication

### Backend
- FastAPI
- Python 3.9+
- SQLModel for database modeling
- PostgreSQL for database
- JWT for authentication

### Infrastructure
- Docker & Docker Compose for containerization
- Environment-based configuration

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- PostgreSQL (or Docker to run PostgreSQL in a container)
- Git
- npm or yarn

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fullstack-todo-app.git
cd fullstack-todo-app
```

### 2. Install Backend Dependencies
Navigate to the backend directory and install Python dependencies:

```bash
cd backend
pip install poetry
poetry install
```

### 3. Install Frontend Dependencies
Navigate to the frontend directory and install JavaScript dependencies:

```bash
cd ../frontend  # From the backend directory, or navigate from root
npm install
```

### 4. Configure Environment Variables
Copy the `.env.example` files to `.env` in both directories and configure your settings:

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:
```bash
cp .env.example .env
```

#### Frontend Environment Variables
Create a `.env.local` file in the `frontend` directory:
```bash
cp .env.example .env.local
```

See the [Environment Variables](#environment-variables) section for details.

### 5. Set Up the Database
Run the database migrations:

```bash
cd backend
poetry run python run_migrations.py
```

## Running the Application

### Option 1: Run Locally (Separate Terminals)

#### Terminal 1 - Backend:
```bash
cd backend
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend Docs: http://localhost:8000/docs

### Option 2: Run with Docker Compose
From the project root directory:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Environment Variables

### Backend (.env in backend directory)
```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-super-long-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Frontend Configuration
FRONTEND_URL="http://localhost:3000"

# Backend Configuration
BACKEND_URL="http://localhost:8000"
```

### Frontend (.env.local in frontend directory)
```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-super-long-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Frontend Configuration
FRONTEND_URL="http://localhost:3000"

# Backend Configuration
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/logout` - Logout user

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{task_id}` - Update a task
- `PATCH /api/tasks/{task_id}/complete` - Toggle task completion
- `DELETE /api/tasks/{task_id}` - Delete a task

All endpoints except authentication require a valid JWT token in the Authorization header: `Bearer {token}`.

## Project Structure
```
FullStack_Todo_App/
├── backend/
│   ├── alembic/          # Database migration scripts
│   ├── crud/             # Database operations
│   ├── middleware/       # Authentication and other middleware
│   ├── models/           # Data models
│   ├── routes/           # API route definitions
│   ├── utils/            # Utility functions
│   ├── main.py           # Main FastAPI application
│   ├── auth.py           # Authentication utilities
│   ├── db.py             # Database connection
│   └── pyproject.toml    # Python dependencies
├── frontend/
│   ├── app/              # Next.js pages and routing
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and API clients
│   ├── services/         # Business logic services
│   ├── types/            # TypeScript type definitions
│   ├── public/           # Static assets
│   └── package.json      # Node.js dependencies
├── docker-compose.yml    # Docker configuration
└── README.md
```

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
Make sure you have created `.env` files in both the backend and frontend directories with the correct values.

#### 2. Database Connection Issues
- Ensure PostgreSQL is running and accessible
- Verify your `DATABASE_URL` is correctly formatted
- Check that the database exists and has the proper permissions

#### 3. Authentication Issues
- Ensure `BETTER_AUTH_SECRET` is the same in both frontend and backend
- Verify that `BETTER_AUTH_URL` matches your frontend URL
- Check that JWT tokens are being properly sent in API requests

#### 4. CORS Errors
- Verify that `FRONTEND_URL` in the backend matches your frontend URL
- Check that the frontend is sending requests to the correct backend URL

#### 5. Docker Issues
- Make sure Docker and Docker Compose are properly installed
- Clear Docker cache if experiencing persistent issues: `docker system prune -a`

### Development Tips
- Use `--reload` flag when developing with FastAPI to enable hot reloading
- The frontend uses Next.js hot reloading by default
- Check the browser console and server logs for error messages
- Use the FastAPI docs at `/docs` to test API endpoints directly

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)