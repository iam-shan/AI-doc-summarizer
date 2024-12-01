# AI Document Summarizer - Backend Setup

This is the backend for the AI Document Summarizer application. It provides authentication via JWT and connects to a PostgreSQL database to store user data and chat history.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/get-started) (for running PostgreSQL container)
- [pgAdmin](https://www.pgadmin.org/) (optional, for managing PostgreSQL)

## Setup Instructions

Follow these steps to get the backend running:

### Install Dependencies

Install the required Node.js packages:

```bash
cd backend
npm install  
```

### Set Up PostgreSQL Database

Using Docker

Make sure Docker is installed and running on your machine. Then, run the following command to start a PostgreSQL container:

```bash
docker-compose up -d
```
This will:

- Start a PostgreSQL container.
- Set the default user **root**, password **Root1234**, and database **ai-doc-summarizer**.

### Configure Environment Variables

Create a .env file in the root of the backend directory and add the following environment variables:

```bash
JWT_SECRET=1234
JWT_EXPIRATION=1h
DB_USER=root
DB_PASSWORD=Root1234
DB_NAME=ai-doc-summarizer
DB_HOST=localhost
DB_PORT=5433 
```

### Start the Backend Server

```bash
npm start
```

### JWT Authentication - Token Generation

User registration: Make a **POST** request to **/api/auth/register**
<img width="1540" alt="Screenshot 2024-12-01 at 8 31 40 AM" src="https://github.com/user-attachments/assets/d06e244d-cfa8-419f-83f8-9d62e2f0403b">

User login: Make a **POST** request to **/api/auth/login**
<img width="1541" alt="Screenshot 2024-12-01 at 8 32 18 AM" src="https://github.com/user-attachments/assets/fdf19432-be48-47b3-9dc4-323035ddb538">
