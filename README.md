
Me-API Playground: A full-stack candidate profile management system featuring a RESTful API, a persistent database, and a minimal frontend for querying skills, projects, and professional history.


### Candidate Profile Playground

##Overview

This project is a simple full-stack playground built as part of an assessment.
It stores my candidate profile information in a database and exposes it via a small REST API, along with a minimal React frontend to view data and run queries.
The focus of this project is clarity, correctness, and reproducibility, not UI complexity.


### Architecture

The application follows a standard client–server architecture:
Frontend: React (Vite)
Backend: Node.js + Express
Database: MongoDB Atlas
Hosting: Vercel

The React frontend communicates with the Express backend over HTTP.
The backend connects to MongoDB Atlas to store and retrieve profile data.
CORS is enabled to allow frontend–backend communication.


### Tech Stack

Backend

Node.js
Express.js
MongoDB Atlas
Mongoose
CORS
dotenv

 rontend

React (Vite)
JavaScript
CSS

Hosting

Vercel (frontend and backend)

### Backend API

# Health Check 
 GET /health

# Profile (CRUD)
 POST /profile        -> Create profile
GET  /profile        -> Read profile
PUT  /profile        -> Update profile


Profile fields include:

name
email
education
skills[]
projects[] { title, description, links }
work[]
links { github, linkedin, portfolio }

Skills

GET /skills
GET /skills/top?n=NUMBER


Projects
GET /projects
GET /projects/search?query=TEXT



### Database


# Database UseD
MongoDB Atlas (cloud-hosted MongoDB)


###     Setup (Local)


# Backend

1.Clone the repository
2.Navigate to /backend
3.Install dependencies
     -npm install
4.Create a .env file with:
    MONGO_URI=your_mongodb_connection_string
5.npm run dev


### FRONTEND

1.Navigate to /frontend
2.Install dependencies
            - npm i
3.Create a .env file with:
         VITE_BACKEND_URL=http://localhost:5000
4.Start frontend
       -npm run dev



### LIVE URLS

# Backend:
https://me-api-playgound.vercel.app

# Frontend
https://me-api-playgound-ui.vercel.app/


### RESUME
https://drive.google.com/file/d/1HVfI0Z5lNvrTL2e-3XvULrvyrNe2YVZ1/view?usp=drivesdk

