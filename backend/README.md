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

