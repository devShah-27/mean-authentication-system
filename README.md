# MEAN Stack Authentication System

## Project Overview

This project implements a comprehensive authentication system using the MEAN (MongoDB, Express.js, Angular, Node.js) stack. It provides a robust and secure way to manage user registration, login, authorization, and other account-related functionalities. The system is built with industry best practices and modern security measures to ensure the safety of user data.

## Key Features

* **User Registration:**  New users can create accounts with email and password.
* **Secure Login:**  Users can securely log in with their credentials.
* **JWT Authentication:** JSON Web Tokens (JWT) are used for secure authentication and authorization.
* **Password Reset:** Users can request a password reset link to be sent to their email address.
* **Role-Based Access Control (RBAC):**  Different user roles can be defined (e.g., 'user', 'admin') to restrict access to specific routes or resources based on permissions.
* **Token Refreshing:** Refresh tokens are used to provide extended access for users without requiring them to log in again after their access token expires.

## Technologies Used

**Backend:**
* **Node.js:** JavaScript runtime environment - [https://nodejs.org/](https://nodejs.org/)
* **Express.js:** Web framework for Node.js - [https://expressjs.com/](https://expressjs.com/)
* **MongoDB:** NoSQL database - [https://www.mongodb.com/](https://www.mongodb.com/)
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js - [https://mongoosejs.com/](https://mongoosejs.com/)
* **bcryptjs:** Library for password hashing - [https://www.npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs)
* **jsonwebtoken:** Library for generating and verifying JWTs - [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

**Frontend:**
* **Angular:**  Frontend framework by Google - [https://angular.io/](https://angular.io/)
* **Angular Router:**  For single-page application routing - [https://angular.io/guide/router](https://angular.io/guide/router)
* **Angular HttpClient:** For making HTTP requests to the backend API - [https://angular.io/guide/http](https://angular.io/guide/http)
* **RxJS:**  Reactive programming library for handling asynchronous operations - [https://rxjs.dev/](https://rxjs.dev/)

## Setup and Installation

### Prerequisites

* **Node.js and npm:** Download and install the latest LTS version from [https://nodejs.org/](https://nodejs.org/).
* **MongoDB:** Download and install MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community). Make sure it's running in the background.
* **Angular CLI:** Install the Angular CLI globally: `npm install -g @angular/cli`

### Backend Setup

1. **Navigate to Backend Directory:** `cd backend`
2. **Install Dependencies:** `npm install`
3. **Create Environment Variables:**
    Create a `.env` file in the `backend` directory. Add the following environment variables and replace the placeholders with your actual values:
    ```
    MONGO_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    ```
4. **Start the Backend Server:** `npm start`

### Frontend Setup

1. **Navigate to Frontend Directory:** `cd frontend`
2. **Install Dependencies:** `npm install`
3. **Adjust API URL (if needed):** In the `frontend/src/environments/environment.ts` file, you can modify the `apiUrl` property to match the backend server address if necessary. 
4. **Start the Frontend Development Server:** `ng serve`

## Project Architecture

### Backend (Node.js/Express.js)
* **server.js:** Entry point for the backend application, sets up the server, middleware, and routes.
* **routes/authRoutes.js:**  Defines all the routes related to authentication.
* **controllers/authController.js:**  Contains the logic for handling user authentication and authorization.
* **models/user.js:**  Defines the user schema for MongoDB using Mongoose.
* **middleware/authMiddleware.js:** Contains middleware for JWT verification and role-based access control. 

### Frontend (Angular)
* **src/app/auth/:**  Contains components and services for user authentication.
    * **login/:** Handles user login.
    * **register/:** Handles user registration.
    * **request-reset/:** Handles password reset requests.
    * **reset-password/:** Handles password reset.
    * **auth.service.ts:** Provides methods for communicating with the backend authentication API.
* **src/app/guards/auth.guard.ts:**  Implements route guards to protect routes that require authentication.
* **src/app/components/dashboard/:**  Contains components for the dashboard, which is only accessible to authenticated users.
* **src/app/interceptors/token.interceptor.ts:** Intercepts HTTP requests to automatically add the JWT to the headers.

## Work Process and Challenges

**Phase 1: Backend Setup and API Development**

* **Challenge:**  Designing a secure and efficient authentication flow.
* **Solution:** Implemented JWT authentication with refresh tokens for security and a better user experience.

**Phase 2:  Frontend Development and Integration**

* **Challenge:**  Implementing a user-friendly and responsive UI for the authentication forms.
* **Solution:** Used Angular Material to create aesthetically pleasing and responsive forms.

**Phase 3:  Testing and Security**

* **Challenge:** Ensuring the system's security and preventing vulnerabilities.
* **Solution:**  Conducted thorough testing, including unit tests, integration tests, and security reviews.

## Testing

* **Unit Tests:**  Used Jest to test individual components and services.
* **Integration Tests:**  Tested the interaction between the frontend and backend using Supertest. 

## Best Practices Followed

* **Coding Standards:**  Adhered to consistent naming conventions and code formatting using Prettier and ESLint.
* **Security Measures:** 
    * Implemented JWT for secure authentication.
    * Used bcrypt for password hashing.
    * Protected against common vulnerabilities (e.g., XSS, CSRF). 
* **Version Control:**  Used Git for tracking changes and collaboration.

## Future Improvements

* **Two-Factor Authentication (2FA):** Enhance security by adding 2FA.
* **Account Lockout Mechanism:** Prevent brute-force attacks by temporarily locking accounts after multiple failed login attempts.
* **User Profile Management:** Allow users to update their profiles and manage their account settings.
* **Social Login:**  Integrate social login options (e.g., Google, Facebook). 

## Contributing

Contributions to this project are welcome!  If you would like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your forked repository.
5.  Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
