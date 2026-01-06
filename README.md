# Chef Scout Manager - Full-Stack Application

A professional full-stack web application for managing chef scouting, built with **Angular 20** (frontend), **Spring Boot 3** (backend), **PostgreSQL** (database), and containerized with **Docker**.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

## ✨ Features

### Frontend
- **Professional Landing Page** - Hero section, features showcase, and featured chefs gallery
- **Chef Registration Form** - Chefs can submit profiles directly on landing page with real-time validation
- **Admin Dashboard** - Manage chefs with pagination, filtering, and CRUD operations
- **Responsive Design** - Works seamlessly on desktop and mobile
- **JWT Authentication** - Secure token-based auth with 24-hour expiration
- **Route Guards** - Protected pages accessible only to authenticated users
- **Modern Angular 20** - Standalone components with reactive patterns

### Backend
- **Spring Boot 3.3.5** - RESTful API with clean architecture
- **Chef Management APIs** - Full CRUD with pagination and dynamic filtering
- **Role-Based Access Control** - ADMIN and SCOUT roles with different permissions
- **JWT Security** - Token validation on every protected request
- **Form Validation** - Backend validation for all chef submissions
- **CORS Support** - Cross-origin requests enabled for frontend

### Database
- **PostgreSQL 15** - Reliable relational database
- **JPA/Hibernate ORM** - Automatic schema management
- **Audit Fields** - Track creation and update timestamps

## 🛠️ Technology Stack

### Frontend
- Angular 20.3.0
- TypeScript 5.9.2
- PrimeNG 16.0.0
- RxJS 7.8.0
- Reactive Forms
- Tailwind CSS

### Backend
- Java 17+
- Spring Boot 3.3.5
- Spring Web, Spring Data JPA
- Spring Security
- JWT (jjwt 0.11.5)
- Lombok
- PostgreSQL Driver

### DevOps
- Docker & Docker Compose
- Nginx 1.25

## 📁 Project Structure

```
├── src/                    # Angular Frontend
│   ├── app/
│   │   ├── features/
│   │   │   ├── home/           # Landing page with chef form
│   │   │   ├── auth/           # Login page
│   │   │   └── dashboard/      # Admin dashboard
│   │   └── services/           # API client, auth guard, JWT interceptor
│   └── styles.css
├── backend/                # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/chefscout/
│   │       ├── entity/         # JPA Entities
│   │       ├── repository/     # Data Access
│   │       ├── service/        # Business Logic
│   │       ├── controller/     # REST APIs
│   │       ├── dto/            # DTOs
│   │       ├── security/       # JWT & Security
│   │       └── ChefScoutApplication.java
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── pom.xml
│   └── Dockerfile
├── Dockerfile              # Frontend Container
├── nginx.conf             # Nginx Config
├── docker-compose.yml     # Orchestration
└── README.md
```

## 📋 Prerequisites

### Local Development
- Node.js 20+
- npm 10+
- Java 17+
- Maven 3.9+
- PostgreSQL 15+

### Docker
- Docker 20.10+
- Docker Compose 2.0+

## 🚀 Getting Started

### Local Development

#### Frontend
```bash
npm install
npm start         # http://localhost:4200
npm run build     # Production build
```

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run    # http://localhost:8080
```

#### Database
```bash
# Create database
createdb chefscout

# Update backend/src/main/resources/application.yml with credentials
```

### Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Access:
# Frontend: http://localhost:4200
# Backend:  http://localhost:8080
# DB:       localhost:5432
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Chef Management
- `GET /api/chefs` - List chefs (paginated, filterable)
- `GET /api/chefs/{id}` - Get chef
- `POST /api/chefs` - Create chef
- `PUT /api/chefs/{id}` - Update chef
- `DELETE /api/chefs/{id}` - Delete chef (admin only)

**Query Parameters:**
- `page`, `size` - Pagination
- `sortBy`, `sortDirection` - Sorting
- `search` - Search by name/email
- `cuisine`, `country`, `availability` - Filtering

## 🔐 Authentication

JWT tokens are valid for 24 hours. Tokens are sent in the `Authorization` header as `Bearer <token>`.

Protected routes:
- `/dashboard` - Requires authentication
- `/api/chefs/*` - Requires authentication
- `DELETE /api/chefs/{id}` - Requires ADMIN role

## 👨‍💻 Key Features

### Landing Page
- **Hero Section** - Compelling headline and CTAs
- **Features Showcase** - Six benefit cards highlighting platform features
- **Featured Chefs** - Display of top-rated chefs
- **Chef Registration Form** - Complete form with validation for chef profiles
- **CTA Section** - Final call-to-action

### Admin Dashboard
- **Chef Management Table** - Sortable, filterable data table
- **Real-time Stats** - Total chefs, available chefs, average rating
- **CRUD Operations** - Create, update, delete chefs
- **Pagination** - Handle large datasets efficiently

## 🔒 Security

- Passwords hashed with BCrypt
- JWT tokens with HS256 signing
- CORS configured for frontend domain
- SQL injection prevention via parameterized queries
- Input validation on frontend and backend

## 📝 Notes

- JWT secret should be changed in production
- Database credentials should use environment variables
- Frontend builds to `dist/scout-chefs-manager/browser/`
- Public chef registration (no auth required on landing page)
- Admin login required for dashboard access

## 🐛 Troubleshooting

**Port already in use**: Stop conflicting services or change ports
**API 401 errors**: Check JWT token in localStorage
**Database connection failed**: Verify PostgreSQL is running and credentials are correct
**CORS errors**: Ensure backend has @CrossOrigin annotations

---

**Built with ❤️ for the culinary industry**

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
