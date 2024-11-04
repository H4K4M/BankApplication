# Bank Application Project

This project is a bank application that allows users to deposit, withdraw, and transfer money between accounts. It features a .NET Core Web API for backend operations, a Next.js frontend application for user interaction styled with Tailwind CSS, and Docker configuration for easy setup.

## Project Structure

- **bankapplication**: Contains the frontend of the application.
- **BankAppWebAPI**: Contains the backend API for handling banking operations.
- **Data**: Contains database scripts and seed data.
- **docker-compose.yml**: Docker Compose file to set up the project in a containerized environment.

## Setup

1. Run `docker-compose up` to start the services.

## Features

- User authentication using JWT.
- Money transfer, deposit, and withdrawal functionalities with Token verification.
- Dynamic balance updates without page reload.
- Transaction history views.

## Default Users

For testing, two default users are provided:

- **Username**: `TestUser1`  
  **Password**: `Test@123`
- **Username**: `TestUser2`  
  **Password**: `Test@123`
