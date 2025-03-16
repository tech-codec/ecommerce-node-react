# Frontend - E-commerce Application `shop-store`

This folder contains the client code for the `shop-store` e-commerce application. The frontend is built with React.js and uses Redux for state management.

## Prerequisites

Make sure you have the following installed on your machine:
- Node.js (version 18 or higher)
- npm (version 9 or higher)

## Installation

1. Install the dependencies:

```bash
cd frontend
npm install --legacy-peer-deps
```

2. Create a `.env` file at the root of the frontend folder and add the following environment variables:

```env
VITE_API_URL=http://localhost:3000/api
```

## Running the Development Server

To start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:your_port`.

## Project Structure

- `components` : Contains reusable React components.
- `pages` : Contains the different pages of the application.
- `reducers` : Contains Redux reducer files.
- `actions` : Contains Redux action files.
- `store` : Contains the Redux store configuration files.
- `utils` : Contains utility functions.
- `context` : Contains the various application contexts.

## Demo

- **Online Demo**: [Link to live site](https://shop-store-one.vercel.app/)
    - Example account (email: userpablo@9gmail.com, password: 1234567)
    - Or you can simply create your own account by signing up with a valid email.
- **Video Demo on YouTube**: [Link to the video](https://www.youtube.com/watch?v=SCy1VY_LUCo)

## Overview

### Homepage on Desktop

![Homepage on Desktop](./demo_images/ordi_demo/ordi_accueil.png)

### Homepage on Mobile

![Homepage on Mobile](./demo_images/phone_demo/accuei_phone.png)

### Example Category Page on Desktop

![Example Category Page on Desktop](./demo_images/ordi_demo/ordi_page_cat.png)

### Example Category Page on Mobile

![Example Category Page on Mobile](./demo_images/phone_demo/phone_cat.png)


### Filter on Mobile

![Filter on Mobile](./demo_images/phone_demo/phone_filter.png)

### Product Presentation Page on Desktop

![Product Presentation Page on Desktop](./demo_images/ordi_demo/ordi_hero.png)

### Product Presentation Page on Mobile

![Product Presentation Page on Mobile](./demo_images/phone_demo/phone_hero.png)

### Login Page on Desktop

![Login Page on Desktop](./demo_images/ordi_demo/ordi_login.png)

### Login Page on Mobile

![Login Page on Mobile](./demo_images/phone_demo/phone_login.png)


### Search Presentation on Desktop

![Search Presentation on Desktop](./demo_images/ordi_demo/ordi_seach.png)

### Search Presentation on Mobile

![Search Presentation on Mobile](./demo_images/phone_demo/phone_seach.png)

### Payment Page on Desktop

![Payment Page on Desktop](./demo_images/ordi_demo/ordi_stripe.png)


### Payment Page on Mobile

![Payment Page on Mobile](./demo_images/phone_demo/phone_stripe.png)