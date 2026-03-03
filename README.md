# EduFlow: School Management System

EduFlow is a comprehensive School Management System designed to streamline academic operations. Built with a modern tech stack, it provides a robust platform for Administrators, Teachers, and Students to interact and manage courses and enrollments effectively.

## 🚀 Key Features

- **Role-Based Access Control (RBAC)**: Distinct permissions for Admin, Teacher, and Student roles.
- **Secure Authentication**: JWT-based authentication with hashed passwords (bcrypt).
- **Course Management**: Teachers can create and manage their courses; Admins have full control over all system entities.
- **Student Enrollment**: Students can browse and enroll in available courses.
- **Modern UI**: A responsive and intuitive frontend built with Angular 17.
- **Scalable Architecture**: A clean, modular FastAPI backend following industry best practices.
- **Containerization**: Multi-stage Docker optimization for both frontend and backend.
- **CI/CD Integrated**: Automated builds via GitHub Actions.

---

## 🛠️ Tech Stack

| Component    | Technology       | Purpose                                |
| ------------ | ---------------- | -------------------------------------- |
| **Backend**  | FastAPI (Python) | High-performance REST API              |
| **Frontend** | Angular 17       | Dynamic Single Page Application        |
| **Database** | PostgreSQL       | Relational data persistence            |
| **Auth**     | JWT & Bcrypt     | Security and Identity management       |
| **DevOps**   | Docker & Compose | Containerization & Local Orchestration |
| **CI**       | GitHub Actions   | Automated build pipeline               |

---

## 📂 Project Structure

```
EduFlow/
├── backend/                # FastAPI Application
│   ├── routers/            # API endpoints (Auth, Users, Courses, Enrollments)
│   ├── auth.py             # JWT & Security logic
│   ├── database.py         # DB connection & Session management
│   ├── models.py           # SQLAlchemy ORM models
│   ├── schemas.py          # Pydantic validation schemas
│   ├── main.py             # Application entry point
│   └── Dockerfile          # Multi-stage Python build
├── frontend/               # Angular 17 Application
│   ├── src/app/            # Core logic & Components
│   ├── nginx.conf          # SPA routing configuration
│   └── Dockerfile          # Multi-stage Node/Nginx build
├── infrastructure/         # Infrastructure assets
│   └── db.sql              # Initial Database schema & Seed data
├── .github/workflows/      # CI Pipeline
│   └── ci.yml              # GitHub Actions workflow
├── docker-compose.yml      # Unified container orchestration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed.
- (Optional) **Python 3.12+** and **Node.js 18+** for local development without Docker.

### Local Development (Manual)

1. **Backend**:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Docker Deployment (Recommended)

To spin up the entire stack including the database:

```bash
docker-compose up --build
```

The services will be available at:

- **Frontend**: `http://localhost:4200`
- **Backend API**: `http://localhost:8000`
- **API Docs (Swagger)**: `http://localhost:8000/docs`

---

## 🔐 Default Credentials

The system is seeded with the following users (Password for all: `password123`):

- **Admin**: `admin@school.com`
- **Teacher**: `teacher@school.com`
- **Student**: `ibrahim@gmail.com`

---

## 🔄 CI Pipeline

The included GitHub Actions workflow (`.github/workflows/ci.yml`) automatically builds and validates the Docker images for both services on every push to the `main` branch, ensuring build stability.

---

## 📄 License

This project is licensed under the MIT License.
