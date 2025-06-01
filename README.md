# Personal Finance Tracker

## Project Overview

This is a full-stack personal finance tracker application designed to help users manage their income, expenses, and budgets effectively. It provides functionalities for tracking transactions, setting budget limits for various categories, and visualizing spending habits.

## Features

**User Management:**
*   User registration and login.
*   Google OAuth integration for seamless sign-in.

**Transaction Tracking:**
*   Record income and expense transactions.
*   Categorize transactions for better organization.
*   View a history of all transactions.

**Budgeting:**
*   Set monthly budgets for different spending categories.
*   Track spending against set budgets.
*   View remaining budget for each category.

## Technologies Used

**Backend (Node.js with Express):**
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **MongoDB:** NoSQL database for data storage.
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
*   **JWT (JSON Web Tokens):** For secure user authentication.
*   **Bcrypt.js:** For password hashing.
*   **Passport.js:** Authentication middleware for Node.js (used for Google OAuth).
*   **Axios:** Promise-based HTTP client for making API requests (used in Google OAuth callback).

**Frontend (React):**
*   **React:** JavaScript library for building user interfaces.
*   **React Router DOM:** For declarative routing in React applications.
*   **HTML/CSS:** For structuring and styling the application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or Yarn
*   MongoDB (local installation or a cloud service like MongoDB Atlas)
*   Google OAuth credentials (Client ID and Client Secret) if you plan to use Google login.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd project
    ```

2.  **Backend Setup:**

    Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

    Install backend dependencies:
    ```bash
    npm install
    npm install google-auth-library passport-google-oauth20
    ```

    Create a `.env` file in the `backend` directory and add your environment variables. Replace placeholders with your actual values:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    FRONTEND_URL=http://localhost:3000
    ```
    *   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/finance_tracker` or your MongoDB Atlas URI).
    *   `JWT_SECRET`: A strong, random string for JWT token signing.
    *   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Obtain these from the Google Cloud Console for your OAuth 2.0 client.
    *   `FRONTEND_URL`: The URL where your React frontend will be running.

    Start the backend server:
    ```bash
    npm start
    ```
    The backend server should now be running on `http://localhost:4000` (or your specified PORT).

3.  **Frontend Setup:**

    Open a new terminal, navigate to the `frontend` directory:
    ```bash
    cd ..
    cd frontend\money-track-frontend
    ```

    Install frontend dependencies:
    ```bash
    npm install
    ```

    Start the React development server:
    ```bash
    npm run dev
    ```
    The frontend application should now be running on `http://localhost:3004`.

## API Endpoints

### Authentication
*   `POST /api/auth/register` - Register a new user.
*   `POST /api/auth/login` - Log in a user.
*   `GET /api/auth/google` - Initiate Google OAuth login.
*   `POST /api/auth/google/callback` - Google OAuth callback (handled by backend).
*   `GET /api/auth/login/success` - Social login success redirect.
*   `GET /api/auth/login/failed` - Social login failure redirect.

### Budgets (Protected Routes - require authentication token)
*   `POST /api/budgets` - Set or update a budget for a category.
*   `GET /api/budgets` - Get all budgets for the authenticated user.
*   `GET /api/budgets/status` - Get the current budget status (spent vs. budgeted) for all categories.

### Transactions (Protected Routes - require authentication token)
*   `POST /api/transactions` - Create a new transaction.
*   `GET /api/transactions` - Get all transactions for the authenticated user.
*   `DELETE /api/transactions/:id` - Delete a specific transaction by ID.

## Project Structure


