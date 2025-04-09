# Secure Country Insights API Middleware – README

A full-stack secure API middleware web application built for 6COSC022W Coursework 1. This system allows users to register, login, generate/manage API keys, and fetch filtered data from the [REST Countries API](https://restcountries.com). The platform provides role-based access control (admin/user), session handling using JWT stored in HttpOnly cookies, and admin-level analytics for API usage.

---

## Features Overview

### Authentication & Authorization
- User registration (role selection: admin/user)
- Login with secure password hashing using `bcrypt`
- Session managed with JWT (stored in HttpOnly cookies)
- Auto token refresh system implemented

### API Key Management
- Generate and delete API keys
- Select an active API key to fetch country data
- Track unused API keys

### Country Search
- Search countries using RESTCountries API via your middleware
- Filtered response includes:
  - Country name
  - Capital
  - Currency
  - Languages
  - National flag

### Admin Dashboard
- View all registered users with last login + API key count
- View and revoke unused API keys (not used in over 2 days)
- View risky API key owners and total search counts
- Audit actions are logged for transparency

### Frontend Features (React)
- Beautiful and responsive UI for login, registration, and dashboards
- Toast notifications using `react-toastify` (no default alert popups)
- User-friendly experience with proper loading states and input validations

---

## Project Setup


### 1. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` folder:
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET_KEY=supersecureadminkey
```
Start the backend:
```bash
node server.js
```

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Your frontend runs at `http://localhost:3001` by default.

---

## Directory Structure

```
📦 backend
 ┣ 📂controllers
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂middleware
 ┣ 📂utils
 ┣ 📜server.js

📦 frontend
 ┣ 📂components
 ┣ 📜App.js
 ┣ 📜MainRoutes.js
```

---

## API Endpoints Summary

| Method | Endpoint                        | Role       | Description                          |
|--------|----------------------------------|------------|--------------------------------------|
| POST   | /auth/register                   | Public     | Register as user or admin            |
| POST   | /auth/login                      | Public     | Login and start secure session       |
| GET    | /auth/get-api-keys              | User       | View generated API keys              |
| POST   | /auth/generate-api-key          | User       | Create new API key                   |
| DELETE | /auth/delete-api-key/:apiKey    | User       | Delete an API key                    |
| GET    | /countries/:country             | User       | Fetch country data (with API key)    |
| GET    | /admin/users                    | Admin      | View all users                       |
| GET    | /admin/unused-api-keys         | Admin      | View unused API keys (2+ days)       |
| POST   | /admin/api-key-owners          | Admin      | View risky API key owners            |
| DELETE | /admin/api-key/:userId         | Admin      | Revoke a user's API key              |

---

## Security Highlights

- JWT stored securely in HttpOnly cookies
- Automatic session refresh on token expiration
- Role-based access protection (admin vs user)
- API key-based route validation
- Admin logs for key revocations and usage

---

## Testing & Usage Tips

- Use Register to create a user or admin
- After logging in, explore respective dashboards
- Users must select a valid API key before fetching country info
- Admins can review unused keys and revoke them

---

## Viva/Vodcast-Ready Checklist

- Live demonstration of all features (User + Admin dashboards)
- Auth with secure login + session refresh
- Full API key management and usage
- Secure cookie + JWT-based protection
- Explanation of code + security design

---

## Docker Setup (optional enhancement)
A Dockerfile and docker-compose setup can be added to containerize both frontend and backend for production.

---

## Acknowledgments
Created for 6COSC022W – Web & API Development coursework at the University of Westminster.

---

## Contact
Maintainer: Hasandi Lavanya Gunasekera  
Student ID: 20211168 
Email: hl.gunasekera2001@gmail.com / hasandi.20211168@iit.ac.lk
