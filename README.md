# HushHub
# MERN Application

This repository contains a Secret Sharing MERN application (MongoDB, Express.js, React.js, Node.js) application that serves as a template or starting point for building full-stack web applications.

## Features

- Full-stack MERN application template.
- Separation of frontend (React) and backend (Express) code.
- Easily extendable and customizable.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB installed locally or accessible remotely.

## Getting Started

Follow the steps below to set up and run the application on your local machine.

### Setting up MongoDB

1. [Install MongoDB](https://docs.mongodb.com/manual/installation/) on your machine or use a remote MongoDB server.

2. Create a MongoDB database and note down the connection URI.

### Installing Dependencies

Navigate to the `server` and `client` directories and install the dependencies.

```bash
cd server
npm install

cd ../client
npm install

In the server directory, create a .env file and configure the MongoDB connection URI.
MONGODB_URI=your_mongodb_connection_uri

Then, start the server.
npm start

Start the Frontend Development Server
In the client directory, start the React development server.
npm run dev
