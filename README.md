#  Store Rating Portal

A full-stack web application that enables users to rate stores, with role-based access for Admins, Store Owners, and Normal Users. Built with **React**, **Node.js**, **Express**, and **MySQL**, and deployed on **Netlify** (frontend) and **Railway** (backend + database).

## Project Overview

This application allows:
- Admins to manage users and stores
- Store Owners to view/store ratings
- Normal Users to rate stores
- All users to update their passwords securely

Authentication is handled via **JWT**, passwords are securely stored using **bcrypt**, and real-time UI updates improve user experience across desktop and mobile views.

---

## Features

### User Roles

- **Admin**:
  - Add Users and Stores
  - View store/user/rating stats
- **Store Owner**:
  - View ratings for their assigned stores
- **Normal User**:
  - Search and rate stores
  - View average ratings and update own password

### Authentication
- JWT-based token authentication
- Secure password storage with bcrypt
- Role-based route protection

### Responsive UI
- Designed with custom CSS for both desktop and mobile users
- Clean and intuitive dashboards

### Store Rating Logic
- Rating system using stars (★)
- Average rating computed dynamically
- Real-time updates post submission

---

## Tech Stack

| Layer        | Tech |
|--------------|------|
| Frontend     | React (Class Components), CSS |
| Backend      | Node.js, Express |
| Database     | MySQL (Railway) |
| Auth         | JWT, bcryptjs |
| Deployment   | Netlify (Frontend), Railway (Backend & DB) |

---

## Live Demo

- **Frontend**: [https://storeratingportal.netlify.app](https://storeratingportal.netlify.app)
- **Backend API**: Hosted on Railway

## API's

Admin Login 

# POST

Api:-   https://storeratingportal-production.up.railway.app/auth/login

## Request:-

{
    "email":"admin@example.com",
    "password":"Admin@123"
}

## Response

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUyMjEyMzkyLCJleHAiOjE3NTIyMTU5OTJ9.w_e9CxiBvHlmnDPPQfVSM4ukjC_LK0nuyfLgeh_R6u4",
    "user": {
        "id": 2,
        "name": "System Admin",
        "email": "admin@example.com",
        "role": "ADMIN",
        "address": "Telangana Hyderabad India"
    }
}

------------------------------------------------------------------------------------------------------

Owner Creation

# POST

Api:- https://storeratingportal-production.up.railway.app/admin/owners

## Request 

{
  "name": "D‑Mart Franchisee",
  "email": "owner.dmart@example.com",
  "password": "Owner@123",
  "address": "Hyderabad, 500001"
}

## Respone

{
    "message": "Owner created",
    "owner_id": 18
}

User Creation 

Api:- https://storeratingportal-production.up.railway.app/admin/users

Store Creation

Api:- https://storeratingportal-production.up.railway.app/admin/stores

------------------------------------------------------------------------------------------------------------

Owner Login

# Request 
{
    "email":"owner.reliancemart@example.com",
    "password":"Owner@123"
}

# Response

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJPV05FUiIsImlhdCI6MTc1MjIxMzAzMSwiZXhwIjoxNzUyMjE2NjMxfQ.uYtH4Sk7g8moWuQM2PzfL2caEPAbv0DRLsJ_03rt6vA",
    "user": {
        "id": 11,
        "name": "Reliance Fresh Hanamkonda",
        "email": "owner.reliancemart@example.com",
        "role": "OWNER",
        "address": "Subedari,Hnk"
    }
}

--------------------------------------------------------------------------------------------------------------

User Login

# Request

{
    "email":"srishanthpatel27@gmail.com",
    "password":"Sunny@123"
}

# Response
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTIyMTMyNDYsImV4cCI6MTc1MjIxNjg0Nn0.L3Yg470U2crmVseSYx1-hXP5GDe-Yhi0I58otpAsoL4",
    "user": {
        "id": 4,
        "name": "Thota srishanth Patel",
        "email": "srishanthpatel27@gmail.com",
        "role": "USER",
        "address": "Hyd,50001"
    }
}

--------------------------------------------------------------------------------------------------------------------

Credits

This project was developed by: Thota Srishanth
Trained in MERN Stack at NxtWave
B.Tech (2025), 85% aggregate
Passionate about AI-integrated full-stack development
Built and deployed multiple real-world projects...
