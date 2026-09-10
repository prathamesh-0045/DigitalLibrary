# Run Guide

## MySQL
```sql
CREATE DATABASE digital_library;
```
Update `src/main/resources/application.properties` with your MySQL credentials.

## Backend
Java 17 is supported by this project. From the directory containing `pom.xml`:
```powershell
mvn clean
mvn spring-boot:run
```
Backend: http://localhost:8080

## React frontend
In a second terminal:
```powershell
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Demo admin
Email: `admin@libris.com`
Password: `Admin@123`
