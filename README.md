# 💰 Finance Dashboard Backend

A robust backend system for managing financial records, users, and analytics with **role-based access control** and **dashboard insights**.

---

## 🚀 Live Features

- 🔐 Cookie-based JWT Authentication
- 👤 Role-based Access Control (Admin, Analyst, Viewer)
- 💰 Financial Records Management (CRUD + Filtering)
- 📊 Advanced Dashboard Analytics (Aggregation)
- 🧹 Soft Delete Handling
- ⚙️ Middleware-based Architecture

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|------|
| Node.js | Backend runtime |
| Express.js | API framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM |
| JWT | Authentication |
| Cookie-Parser | Cookie handling |

---

## 🧠 System Design

### 🔐 Authentication Flow
- User logs in → JWT generated
- Token stored in **HTTP-only cookie**
- Middleware validates token for protected routes

---

### 👥 Role-Based Access

| Role     | Permissions |
|----------|------------|
| Viewer   | View dashboard only |
| Analyst  | View records + insights |
| Admin    | Full access (users + records) |

---

### 🏗️ Backend Architecture
Request → Middleware → Route → Database → Response


- Middleware handles authentication & authorization
- Routes handle business logic
- MongoDB handles persistence

---

## 📦 API Endpoints

### 🔐 Auth
POST /auth/register
POST /auth/login
POST /auth/logout

### 👤 Users (Admin only)

GET /users/get-users
GET /users/get-user/:id
POST /users/create-user
PATCH /users/update-user/:id
DELETE /users/delete-user/:id
### 💰 Records
POST /records/create-record
GET /records/get-records
PUT /records/update-record/:id
DELETE /records/delete-record/:id

#### 🔍 Filters
/records/get-records?type=income
/records/get-records?category=food
/records/get-records?startDate=...&endDate=...

### 📊 Dashboard APIs (Key Feature)
GET /dashboard/summary
GET /dashboard/categories
GET /dashboard/trends
GET /dashboard/recent

---

## 📊 Dashboard Insights

- Total Income & Expenses
- Net Balance (can be negative → real-world scenario)
- Category-wise breakdown
- Monthly trends (aggregation pipeline)
- Recent transactions

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone (https://github.com/mirzashanehyder/financial-dashboard-backend/edit/main/README.md)
cd financial-dashboard-backend ```

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File
PORT=5000
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_secret_key

4️⃣ Run Server
npm run dev
🧪 Testing APIs

Use:
VS Code REST Client (req.http)
Postman

🔍 Key Design Decisions
✅ 1. Cookie-Based Authentication
More secure than local storage
Prevents XSS attacks

✅ 2. Role-Based Access Control
Clear separation of responsibilities
Ensures data integrity

✅ 3. Aggregation Pipeline (MongoDB)
Efficient analytics
Reduces backend processing load

✅ 4. Soft Delete Strategy
Avoids permanent data loss
Maintains auditability

⚠️ Note on Middleware Design
Avoided automatic query middleware (pre("find"))
Prevents hidden side effects
Improves debugging and control

📈 Future Improvements
Pagination & Search
Rate limiting
API documentation (Swagger)
Unit & integration testing
Budget tracking feature


👨‍💻 Author
Shane Hyder

⭐ Conclusion
This project demonstrates:
Backend architecture design
Secure authentication
Role-based access control
Data aggregation & analytics
