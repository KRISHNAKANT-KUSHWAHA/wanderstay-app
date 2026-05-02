# 🌍 WanderStay

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![EJS](https://img.shields.io/badge/EJS-Templating-red)
![Render](https://img.shields.io/badge/Deployed%20on-Render-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🚀 Project Overview

**WanderStay** is a full-stack web application inspired by Airbnb that allows users to explore, create, review, and manage travel property listings.
- Link : https://wanderstay-app1.onrender.com/listings
The platform enables authenticated users to:
- Create listings
- Upload property images
- Add reviews
- Manage their own listings

It is built using modern backend technologies with secure authentication and cloud-based media storage.

---

## 🎯 Problem It Solves

WanderStay provides a centralized platform where travelers can:
- Discover unique stays worldwide
- Share experiences through reviews
- Manage property listings securely

It demonstrates a production-ready backend architecture using authentication, sessions, database relationships, and cloud integrations.

---

## 👥 Target Users

- Travelers exploring accommodations
- Property owners listing their stays
- Developers learning full-stack backend development
- Recruiters evaluating real-world Node.js projects

---

## 🛠 Tech Stack

### 💻 Backend
- Node.js
- Express.js
- Passport.js (Authentication)
- Express Session

### 🗄 Database
- MongoDB Atlas
- Mongoose ODM

### 🎨 Frontend
- EJS Templating
- Bootstrap
- Custom CSS

### ☁️ Cloud & Tools
- Cloudinary (Image Storage)
- Render (Deployment)
- Git & GitHub
- dotenv

---

## ✨ Features

- 🔐 User Signup & Login (Passport Authentication)
- 🏠 Create / Edit / Delete Listings
- 🖼 Image Upload with Cloudinary
- ⭐ Add & Delete Reviews
- 🔒 Authorization (Only owner can edit/delete)
- 💬 Flash Messages
- 🌐 Deployed Production App
- 📦 MVC Architecture

---

## 📁 Folder Structure

```
wanderstay/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controller/
│   ├── listings.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── error.ejs
│
├── public/
├── utils/
├── middleware.js
├── cloudConfig.js
├── app.js
├── package.json
└── .env
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/wanderstay.git
cd wanderstay
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

## ▶️ Running Locally

```bash
npm start
```

Visit:

```
http://localhost:3001
```

---

## 🌐 API Endpoints

### Authentication

| Method | Route | Description |
|--------|-------|------------|
| GET | /signup | Signup form |
| POST | /signup | Register user |
| GET | /login | Login form |
| POST | /login | Authenticate user |
| GET | /logout | Logout user |

### Listings

| Method | Route | Description |
|--------|-------|------------|
| GET | /listings | All listings |
| GET | /listings/new | Create listing form |
| POST | /listings | Create listing |
| GET | /listings/:id | View listing |
| PUT | /listings/:id | Update listing |
| DELETE | /listings/:id | Delete listing |

### Reviews

| Method | Route | Description |
|--------|-------|------------|
| POST | /listings/:id/reviews | Add review |
| DELETE | /listings/:id/reviews/:reviewId | Delete review |

---

## 📸 Screenshots

_Add screenshots here_

```
/screenshots/home.png
/screenshots/listing.png
/screenshots/login.png
```

---

## 🚀 Deployment (Render)

### Steps:

1. Push project to GitHub
2. Go to https://render.com
3. Create New Web Service
4. Connect GitHub Repository
5. Set:

```
Build Command: npm install
Start Command: node app.js
```

6. Add Environment Variables in Render Dashboard
7. Deploy 🎉

---

## 🔮 Future Enhancements

- 🔍 Search & Filtering
- 📍 Map Integration (Mapbox)
- 💳 Payment Integration
- 📊 Admin Dashboard
- 🧾 Booking System
- 🌙 Dark Mode
- 📱 Responsive UI Improvements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create new branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💼 Interview Notes

This project demonstrates:

- MVC Architecture
- Authentication & Authorization
- RESTful Routing
- Session Management
- Cloud Integration
- Production Deployment
- Error Handling & Middleware

---

## 🌟 Live Demo

```
https://wanderstay-app1.onrender.com/listings
```

---

## 👨‍💻 Author

**Krishnakant Kushwaha**

B.Tech CSE | Full Stack Developer  
Passionate about backend  🚀

---

⭐ If you found this helpful, consider giving it a star!
