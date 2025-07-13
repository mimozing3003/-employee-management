# Apollonia Dental Practice Employee Management

A full-stack CRUD web application for managing employees and departments at Apollonia Dental Practice. Built with Node.js, Express, MongoDB, and Docker, this app provides a foundation for future employee and customer relationship management features.

## Features
- Manage departments (add, view, delete)
- Manage employees (add, view, edit, delete, assign to department)
- Clean, modern web UI
- RESTful API
- Dockerized for easy deployment

## Tech Stack
- Node.js + Express (backend)
- MongoDB + Mongoose (database)
- HTML, CSS, JavaScript (frontend)
- Docker & Docker Compose (containerization)

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed

### Quick Start (Recommended)
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd employee-management
   ```
2. **Start the app with Docker Compose:**
   ```bash
   docker-compose up --build
   ```
3. **Seed the database (optional, for demo data):**
   ```bash
   docker-compose exec app node seed.js
   ```
4. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)

### Manual Setup (Without Docker)
1. Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/employee_management
   ```
4. Start MongoDB (if not already running)
5. Start the server:
   ```bash
   node server.js
   ```
6. (Optional) Seed the database:
   ```bash
   node seed.js
   ```
7. Open https://employee-management-alpha-inky.vercel.app/

## Usage
- **Departments:** Add new departments, view all, and delete.
- **Employees:** Add new employees, edit or delete existing ones, assign to departments.
- All changes are reflected instantly in the UI.

## Project Structure
```
├── models/           # Mongoose models
├── routes/           # API route handlers
├── public/           # Frontend (HTML, CSS, JS)
├── seed.js           # Database seeding script
├── server.js         # Express server
├── Dockerfile        # Docker image for Node.js app
├── docker-compose.yml# Multi-container setup
├── .env              # Environment variables
```

## Troubleshooting
- **MongoDB connection errors:**
  - Ensure MongoDB is running and `MONGO_URI` is correct.
  - With Docker, the URI should be `mongodb://mongo:27017/employee_management`.
- **Port conflicts:**
  - Make sure ports 3000 (app) and 27017 (MongoDB) are free.
- **Static files not loading:**
  - Ensure `app.use(express.static('public'))` is set in `server.js`.
- **Seeding issues:**
  - Run the seed script after the containers are up.

## Customization & Extending
- Add more fields to employees (e.g., birth date, email, role)
- Add authentication, user roles, or more advanced features
- Improve UI/UX with frameworks like React or Vue

## License
MIT

---
**Developed for Apollonia Dental Practice as a foundation for digital employee management.** 
---

## **How to Create the `.env` File**

1. **In your project root (`D:\employee mangement`), create a new file named:**
   ```
   .env
   ```

2. **Open `.env` in a text editor and add this line:**
   ```
   MONGO_URI=mongodb://localhost:27017/employee_management
   ```

3. **Save the file.**

---

## **How to Make Sure MongoDB is Running**

- If you installed MongoDB locally, you can start it with:
  - **Windows Service:**  
    ```
    net start MongoDB
    ```
  - **Or open a new terminal and run:**  
    ```
    mongod
    ```
  - **Or use MongoDB Compass** to check if the server is running.

- If you use Docker, MongoDB will run automatically with:
  ```
  docker-compose up --build
  ```

---

## **Next Steps**

1. After creating the `.env` file and ensuring MongoDB is running, try:
   ```bash
   node seed.js
   ```
   You should see `Database seeded successfully!`

2. Then start your server:
   ```bash
   node server.js
   ```

3. Open https://employee-management-alpha-inky.vercel.app/ in your browser.

---

If you run into any issues, copy the error message here and I’ll help you fix it! 
