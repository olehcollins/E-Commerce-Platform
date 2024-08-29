# Seraphin E-Commerce Platform

**Seraphin** is a full-stack e-commerce platform where customers can browse, add to their wishlist, add products to their cart, and purchase Apple devices. The application is built using TypeScript, React, and Redux Toolkit for the client-side, and Node.js with Express.js for the server-side. It utilises JWT for secure user authentication.

## Features

- **Product Browsing**: Browse a variety of Apple devices.
- **Wishlist**: Add products to a personalised wishlist.
- **Cart Management**: Add products to a shopping cart.
- **Secure Checkout**: Choose between Stripe or PayPal for secure payments.
- **User Authentication**: Utilises JWT for user login and authentication.

## Tools and Technologies

- **Frontend**: TypeScript, React, Redux Toolkit, React Router, React Query, Axios
- **Backend**: Node.js, Express.js, TypeScript, Mongoose (MongoDB), JWT
- **Deployment**: Backend on Heroku, Frontend on Vercel
- **Other Libraries**: ESLint, Cloudinary, FontAwesome, React Hook Form, React Toastify

## Live Demo

- **Link**: [[Vercel Deployment Link](https://your-vercel-link.com)](https://swiftshop-eight.vercel.app/)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (version 16 or above)
- npm or yarn

### Cloning the Repository

To clone the repository, run the following command:

```bash
git clone https://github.com/your-username/seraphin.git
cd seraphin
```
## Setting Up Environment Variables

- You will need to set up environment variables for both the client and server.

**Server Environment Variables:**
- Create a .env file in the server directory and add the following:
```env
  DATABASE_URI=your_mongodb_connection_string
  PAYPAL_CLIENT_ID=your_paypal_client_id
  JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
  PORT=your_server_port
```
**Client Environment Variables:**
- Create a .env file in the client directory and add the following:
```env
  VITE_API_BASE_URL=https://lit-mountain-17642-0035c22f4149.herokuapp.com
  VITE_NODE_ENV=production
```
## Setting Up the Database
1. Create a MongoDB account and set up your database. Follow this video guide to get your MongoDB connection string.
  - https://www.youtube.com/watch?v=oVHQXwkdS6w&pp=ygUoc2V0IHVwIG1vbmdvIGRiIGFuZCBnZXQgY29uZWN0aW9uIHN0cmluZw%3D%3D
2.	Add your MongoDB connection string to the DATABASE_URI variable in the .env file in the server directory.
3.	Open the config/dbConnect.ts file and uncomment the following lines to seed the database:
``` js
  // import { seedProducts } from "../src/seeds/seed.ts";
  // seedProducts();
```
## Running the Server
```bash
  cd server
  npm install
  npm run dev
```
## Running the Client
```bash
  cd client
  npm install
  npm run dev
```
