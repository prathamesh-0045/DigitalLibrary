# Digital Library — Full-Stack Architecture

```text
React.js + Vite
        ↓
Beautiful Libris UI
        ↓
Login / Register
        ↓
Admin Dashboard
        ↓
Add / Edit / Delete Books
        ↓
Borrow / Return
        ↓
Reserve
        ↓
Automatic Fine
        ↓
Spring Boot REST API
        ↓
MySQL
```

## Frontend
`frontend/src` is organised into API, reusable components, pages, and service modules.

## Backend
`src/main/java/com/oasis/library` contains controllers, entities, repositories, services, security, and data initialization.

## Data flow
React uses Axios to call Spring Boot REST endpoints. Controllers delegate to the service layer, repositories persist JPA entities, and MySQL stores users, books, loans, bookings, and contact messages.
