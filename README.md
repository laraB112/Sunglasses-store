# PureLux — Luxury Sunglasses Store

## Overview

**Full-Stack E-Commerce Platform for Luxury Sunglasses**

PureLux is a full-stack e-commerce web application designed to provide customers with a convenient way to browse, explore, and purchase luxury sunglasses online.

The platform combines an interactive React frontend with a Node.js and Express.js backend, using MySQL for database management. It also includes an administrative dashboard for managing products and customer orders.

## Problem Statement

Traditional product-selling processes may lack a centralized platform where customers can explore products, manage shopping carts, and place orders conveniently.

Store administrators also need an efficient way to manage product listings, upload product images, and monitor customer orders.

These challenges can lead to:

- Difficulties browsing and finding products.
- Inconvenient shopping and checkout processes.
- Time-consuming product management.
- Manual order tracking and administration.
- Limited integration between the customer interface and backend services.

## Solution

PureLux provides an integrated e-commerce platform connecting a customer-facing storefront with backend APIs and a MySQL database.

Customers can browse the sunglasses collection, search and filter products, manage their shopping carts, and complete the checkout process. Administrators can manage product listings and access customer order information through a dedicated dashboard.

The system centralizes essential shopping and administrative operations within one application.

## Core Features

### Customer Portal

Customers can:

- Browse the sunglasses collection.
- Search and filter available products.
- View product details.
- Add products to the shopping cart.
- Update product quantities and manage cart items.
- Proceed through guest checkout.
- Register and log in to an account.
- Place orders and view order confirmation.

### Administration Portal

Administrators can:

- Access the admin login.
- View dashboard statistics.
- Add new products.
- Edit existing product information.
- Delete products.
- Upload product images.
- View and manage customer orders.

### Product Management

The application provides product management functionality through backend API endpoints and database operations, allowing product information to be created, updated, retrieved, and deleted.

### Shopping and Order Management

The shopping workflow connects product browsing, cart management, checkout, and order creation to support the customer's purchasing journey.

## User Roles

### Customer

Users who browse products, manage their carts, and place orders.

### Administrator

The person responsible for managing the product catalog and monitoring customer orders through the administrative dashboard.

## System Workflow

1. The customer opens the PureLux storefront.
2. The customer browses, searches, or filters the available sunglasses.
3. The customer views product details and adds selected products to the cart.
4. The customer reviews the cart and proceeds to checkout.
5. The React frontend sends the necessary requests to the backend.
6. The Node.js server runs the application, while Express.js handles API routes and HTTP requests.
7. The backend interacts with MySQL to store and retrieve application data.
8. The administrator accesses the dashboard to manage products and review orders.

## Technology Stack

### Frontend

- React 18
- JavaScript
- React Router
- Bootstrap 5
- React Context API
- Bootstrap Icons
- HTML5 and CSS3

### Backend

- Node.js — JavaScript runtime for the server.
- Express.js — Backend framework for handling API routes and HTTP requests.
- RESTful APIs — Communication between the frontend and backend.
- Multer — File upload handling.
- CORS — Cross-origin request configuration.

### Database

- MySQL — Relational database for storing application data.

### API Communication

- HTTP requests and responses.
- RESTful API architecture.
- Frontend-to-backend communication.

## System Architecture

```text
       Customer / Administrator
                  |
                  v
           React Frontend
                  |
             HTTP Requests
                  |
                  v
           Node.js Server
                  |
                  v
            Express.js API
                  |
          +-------+--------+
          |                |
          v                v
    MySQL Database    Image Uploads
          |
          v
   Products, Users,
      and Orders
```

The React frontend communicates with the backend through HTTP requests. Node.js runs the server, and Express.js handles API routing and request processing. The backend interacts with MySQL for data storage and retrieval, while Multer handles product image uploads.

## Non-Functional Requirements

- Clear and consistent user interface.
- Organized separation between frontend and backend.
- Reliable database operations.
- Appropriate protection for authentication and administrative access.
- Maintainable application structure.
- Validation of user input and order information.
- Responsive layout across supported screen sizes.

## Future Enhancements

- Online payment gateway integration.
- Wishlist functionality.
- Product ratings and reviews.
- Order tracking.
- Email notifications for order updates.
- Enhanced mobile responsiveness.
- Improved inventory management.

## Project Status

**Full-Stack E-Commerce Project**

PureLux includes a React storefront, a Node.js and Express.js backend, MySQL database integration, and an administrative interface for product and order management.

## Author

**Lara Al Bayasli**

GitHub: https://github.com/laraB112
