# 🚀 Elite Auth API

A production-ready Authentication & Authorization REST API built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

The API provides secure user authentication using JWT, email verification with OTP, refresh token authentication, password reset via email, and role-based authorization. It follows a clean project
structure and backend best practices suitable for production applications.

---

## ✨ Features

- 🔐 User Registration
- 📧 Email Verification using OTP
- 🔑 Secure Login
- 🔄 Refresh Token Authentication
- 🔒 JWT Access Token Authentication
- 🔁 Forgot Password
- 🔐 Reset Password
- 🚪 Logout
- 👤 Role-Based Authorization
- 🔑 Password Hashing (bcrypt)
- 📩 Email Notifications (Nodemailer)
- ✅ Request Validation (Joi)
- 🛡 Authentication & Authorization Middleware
- ⚡ Prisma ORM
- 🗄 PostgreSQL Database
- 🌍 Environment Variable Configuration
- 📦 Production Build with Webpack

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- Refresh Token
- bcrypt

### Email Service

- Nodemailer

### Validation

- Joi

### Build Tool

- Webpack

---

# 📁 Project Structure

```text
elite-auth-api
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── config/
│   │   └── mail.ts
│   │
│   ├── controllers/
│   │   └── authController.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── authorizedMiddleware.ts
│   │
│   ├── repositories/
│   │
│   ├── routes/
│   │   └── authRoutes.ts
│   │
│   ├── services/
│   │   └── emailService.ts
│   │
│   ├── templates/
│   │   ├── otpTemplate.ts
│   │   ├── passwordTemplate.ts
│   │   └── welcomeTemplate.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── uploads/
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── otp.ts
│   │   └── resetToken.ts
│   │
│   ├── validations/
│   │
│   ├── app.ts
│   └── server.ts
│
├── generated/
├── dist/
├── .env.example
├── package.json
├── package-lock.json
├── prisma.config.ts
├── tsconfig.json
├── webpack.config.cjs
└── README.md
```

---

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/<your-github-username>/elite-auth-api.git
```

### Go to Project Folder

```bash
cd elite-auth-api
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file from `.env.example`.

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migration

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

Server runs on

```
http://localhost:1213
```

---

# 🌍 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=1213

DATABASE_URL="postgresql://username:password@localhost:5432/database"

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_app_password

```

> **Note:** Never commit your `.env` file to GitHub.

---

# 📚 API Endpoints

## Authentication & User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/verify-otp` | Verify the user's email using the OTP |
| POST | `/api/auth/resend-otp` | Resend a new OTP for email verification |
| POST | `/api/auth/login` | Authenticate a user and generate access & refresh tokens |
| GET | `/api/auth/profile` | Get the authenticated user's profile |
| GET | `/api/auth/admin` | Access a protected admin-only endpoint |
| POST | `/api/auth/refresh-token` | Generate a new access token using a valid refresh token |
| POST | `/api/auth/forgot-password` | Send a password reset email |
| POST | `/api/auth/reset-password` | Reset the user's password using the reset token |
| POST | `/api/auth/logout` | Log out the user and invalidate the refresh token |

---

# 🔐 Authentication

Protected endpoints require an Access Token.

Example:

```http
Authorization: Bearer <access_token>
```

---

# 📦 Available Scripts

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Start production server

```bash
npm start
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# ☁️ Deployment

The project is ready for deployment on **Render**.

### Build Command

```bash
npm install && npm run build && npx prisma generate
```

### Start Command

```bash
npm start
```

### Live API

```
https://elite-auth-api.onrender.com
```

---

# 🚀 Future Improvements

- Google OAuth
- GitHub OAuth
- Two-Factor Authentication (2FA)
- Redis for Refresh Tokens
- Swagger / OpenAPI Documentation
- Docker Support
- Unit Testing
- Integration Testing
- Rate Limiting
- API Versioning

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Avi Italiya**

Backend Developer

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM

If you found this project useful, consider giving it a ⭐ on GitHub.
