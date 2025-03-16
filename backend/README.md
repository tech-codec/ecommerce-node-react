# E-commerce Application `shop-store`

Welcome to the `shop-store` e-commerce application repository. This project is a complete e-commerce application built with Node.js for the backend and React.js for the frontend. The repository is organized into three main parts:
- Backend: Manages APIs and server-side logic.
- Frontend: The user interface for customers.
- Admin: The admin panel to manage products, orders, visit analysis, etc.

## Application Features

- Management system for (users, products, categories, roles, visits, orders, notifications)
- Full authentication system (email sending via Gmail, password recovery, etc.)
- Payment system with Stripe and use of webhooks to validate purchase events on the site
- Use of websockets for real-time online purchase notifications
- `Dashboard` for analysis of (orders, revenue, products, site visits, customers, etc.)
- Shopping cart management system

## Repository Structure

- `backend`: Contains the Node.js server code.
- `frontend`: Contains the React.js client code.
- `admin`: Contains the React.js admin panel.

## Prerequisites

Make sure you have the following installed on your machine:
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- MongoDB (if using a local database)

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/tech-codec/ecommerce-node-react.git
cd ecommerce-node-react
```

### Demo
- **Live demo of the frontend (customer side)**: [Online site link](https://shop-store-one.vercel.app/)
    - Example account (email: userpablo@9gmail.com, password: 1234567)
    - Or you can simply create your account by signing up with a valid email
- **Online video demo of this part on my YouTube channel**: [Video link](https://www.youtube.com/watch?v=SCy1VY_LUCo)

- **Live demo of the admin panel**: [Online site link](https://admin-shop-store.vercel.app/)
    - Example account (email: useralain99@gmail.com, password: 1234567)
    - Or you can simply create your account by signing up with a valid email
- **Online video demo of this part on my YouTube channel**: [Video link](https://youtu.be/-skrT-X8nPs)

### Backend

Check the [backend README](backend/README.md) for installation and server configuration instructions.

### Frontend

Check the [frontend README](frontend/README.md) for installation and configuration instructions for the user interface, including a demo and video.

### Admin

Check the [admin panel README](admin/README.md) for installation and configuration instructions for the admin panel, including a demo and video.

---

# Backend - E-commerce Application

This folder contains the server-side code of the `shop-store` e-commerce application. The backend is built with Node.js and Express.js and uses MongoDB as the database.

## Prerequisites

Make sure you have the following installed on your machine:
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- MongoDB (if using a local database)

## Installation

1. Install dependencies with the following commands:

```bash
cd backend
npm install
```

2. Create a `.env` file in the root of the backend folder and add the following environment variables:

```env
PORT = 3000
API_URL = https://your_ngrok_generated_domain/api
DB_USER_PASS = your_mongodb_user_name_and_password e.g., <your_user_name>:your_password
JWT_SECRET = your_jwt_secret
MONGODB_URI = your_mongodb_connection_string
EMAIL_USER = your_email_for_receiving_mails_on_gmail
NAME_USER = your_gmail_user_name
EMAIL_PASS = your_gmail_password
STRIPE_SECRET_KEY = your_stripe_secret_key
END_POINT_SECRET = your_webhook_end_point_secret
CLIENT_URL = http://localhost:your_react_client_app_port
ADMIN_URL = http://localhost:your_react_admin_app_port
CLIENT_ID = your_google_cloud_client_id
CLIENT_SECRET = your_google_cloud_client_secret
REDIRECT_URL = https://developers.google.com/oauthplayground
REFRESH_TOKEN = your_google_service_mail_refresh_token
```

## Start the Server

To start the server in development mode, use one of the following commands:

```bash
npm start 
npm run dev_start
```

The server will be accessible at `http://localhost:3000`.

## Project Structure

- `controllers`: Contains controllers for various routes.
- `models`: Contains database models.
- `routes`: Contains route definitions.
- `middlewares`: Contains middleware functions.
- `config`: Contains configuration files.
- `share`: Shared folder.
- `utils`: Various utility functions for the API.
- `views`: Contains templates for sending emails via Gmail.

