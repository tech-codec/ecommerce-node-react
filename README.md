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

