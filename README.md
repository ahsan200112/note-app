# Notes CRUD Application

A full-stack Notes application built with **React** (client-side) and **Node.js** with **Express** (server-side). This application allows users to create, read, update, and delete notes and is powered by **MongoDB** for data storage.

## Project Structure

The project is organized into two main folders:

- **`server`**: The Root Folder server-side codebase containing the Express server and CRUD API endpoints.
- **`client`**: The client-side codebase built with React, providing a user interface to interact with the notes API.

---

## Requirements

- **Node.js** (v12+)
- **MongoDB** (local or cloud)
- **NPM** or **Yarn**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <project_name>


# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

#create .env file at root folder
MONGO_URI=mongodb://localhost:27017/notesdb
PORT=3001


npm start
cd client
npm start

#server start http://localhost:3001.
#client start http://localhost:3000.

