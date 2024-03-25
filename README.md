
# KIDDO-Server

KIDDO-Server is the backend server for the Kiddo toy shop application. It provides RESTful APIs for user authentication, managing toy inventory, processing purchases, and generating receipts.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Joysd1010/KIDDO-Server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd KIDDO-Server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following environment variables:

   ```plaintext
   PORT=3001
   DB_USER=your_database_username
   DB_PASS=your_database_password
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_database_username` with the username for your database, `your_database_password` with the password, and `your_jwt_secret` with a secret key for JWT token generation.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will start listening on the specified port (default: 3001).

3. Use the provided RESTful APIs to interact with the backend for user authentication, managing toy inventory, processing purchases, etc.

## API Documentation

- **Authentication:**
  - `POST /api/auth/signup`: Create a new user account.
  - `POST /api/auth/login`: Log in with an existing user account.
  
- **Toy Inventory:**
  - `GET /api/toys`: Get all toys.
  - `POST /api/toys`: Add a new toy to the inventory (requires authentication).
  - `PUT /api/toys/:id`: Update an existing toy (requires authentication).
  - `DELETE /api/toys/:id`: Delete a toy from the inventory (requires authentication).

- **Purchase Processing:**
  - `POST /api/purchase`: Process a toy purchase (requires authentication).

## Dependencies

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.npmjs.com/package/mongodb): Official MongoDB driver for Node.js.
- [Cors](https://www.npmjs.com/package/cors): CORS (Cross-Origin Resource Sharing) middleware for Express.
- [Dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a .env file into process.env.
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation for Node.js.
```
