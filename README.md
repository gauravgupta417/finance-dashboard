#  Fintech API – Finance Data Processing And Access Control

A backend system for managing financial records with role-based access control, analytics dashboard, and secure authentication.

## Live API
 https://fintech-backend-pzl0.onrender.com

> Note: The server may take a few seconds to respond initially due to free-tier hosting.

## Features

### Authentication

* User Registration & Login
* JWT-based authentication
* Password hashing using bcrypt

### User Management

* Role-based users: **Admin, Analyst, Viewer**
* Admin can:

  * View all users
  * Update roles
  * Activate/Deactivate users

### Role-Based Access Control Using Middlewares

* **Admin** → Full access
* **Analyst** → Manage own financial records and access insights
* **Viewer** → Access to dashboard only

## Finance Management

* Create, Read, Update, Delete(Soft Delete Implemented)
* Pagination support
* Filtering:

  * By type (income/expense)
  * By category
  * By date range
* Search functionality (based on category & notes)

---

## Dashboard & Summary Analytics

* Total income, expenses & balance
* Category-wise breakdown
* Recent transactions
* Monthly trends
* Weekly trends

---

## Tech Stack Used

* Node.js
* Express.js
* MongoDB(Mongoose)
* JWT Authentication

---

##  Project Structure

```
src/
 ├── modules/
 │    ├── user/
 │    ├── finance/
 │    ├── dashboard/
 ├── middleware/
 ├── config/
 └── server.js
```

---

## API Endpoints

### Auth

* `POST /api/users/register`
* `POST /api/users/login` (you will get token after login pass this token in headers as Authorization: <token> for accessing authenticated routes)

### User Management (Admin Only)

* `GET /api/users`
* `PATCH /api/users/:id/role`
* `PATCH /api/users/:id/status`

### Finance

* `POST /api/finance`
* `GET /api/finance`
* `PUT /api/finance/:id`
* `DELETE /api/finance/:id`

### Dashboard

* `GET /api/dashboard/summary`
* `GET /api/dashboard/category`
* `GET /api/dashboard/recent`
* `GET /api/dashboard/monthly`
* `GET /api/dashboard/weekly`

---

## Query Parameters (Finance API)

| Param     | Description              |
| --------- | ------------------------ |
| type      | income / expense         |
| category  | filter by category       |
| startDate | filter from date         |
| endDate   | filter to date           |
| page      | pagination               |
| limit     | records per page         |
| search    | search by category/notes |

---

## Authentication And Authorization

* JWT Authentication
* Role-based authorization
* Rate limiting (API protection- max 50 requests per minute)

---

## Setup Instructions

```bash
git clone https://github.com/gauravgupta417/finance-dashboard.git
cd finance-dashboard
npm install
```

### Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

### Run locally:

npm run dev

---

## Design Decisions

* Modular architecture (feature-based)
* Separation of concerns (controller/service)
* Scalable Role based access control implementation
* Aggregation pipelines for analytics

---

## Conclusion

This project demonstrates a scalable backend system with secure authentication, role-based access control,and real-time financial analytics.

---

## Author

Gaurav Gupta
