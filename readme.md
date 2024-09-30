# VitaLink - Healthcare Appointment Scheduling System

## Description

This is a healthcare appointment scheduling system that allows patients to book appointments with doctors. The application features user authentication, doctor and patient profiles, and a user-friendly interface for managing appointments.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Acknowledgments](#acknowledgments)

## Features

-   User authentication for patients and doctors
-   Doctor profile management
-   Patient profile management
-   Appointment booking and management
-   Responsive design with Tailwind CSS
-   Secure data handling with JWT

## Technologies Used

-   **Frontend:** React.js, Tailwind CSS
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Authentication:** JWT (JSON Web Tokens)
-   **State Management:** Context API
-   **Password Security:** CryptoJS with salting for secure password hashing

## Installation

### Prerequisites

-   Node.js
-   MongoDB

### Clone the repository

```bash
git clone https://github.com/rishabhdas1006/vitalink.git
cd vitalink
```

### Install dependencies

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

### Set up environment variables

Create a .env file for both frontend and backend directories, and add the following variables:

-   Backend

```bash
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongodb_uri
```

-   Frontend

```bash
VITE_API_BASE_URL=your_jwt_secret
```

### Run the application

```bash
npm run dev
```

## Usage

1. Visit the application in your browser at `http://localhost:3000`.
2. Register as a doctor or a patient.
3. Log in to access the dashboard.
4. Doctors can manage their profiles and view appointments.
5. Patients can book appointments and view their scheduled appointments.

## API Endpoints

### Authentication

-   POST `/api/v1/auth/register` - Register a new user
-   POST `/api/v1/auth/login` - Log in a user
-   GET `/api/v1/auth/profile` - Get profile details of logged in user
-   GET `/api/v1/auth/detail/:userId` - Get profile details of a user
-   GET `/api/v1/auth/update-profile` - Update profile details of logged in user

### Doctors

-   GET `/api/v1/doctors/all/:query` - Get a list of doctors whose name macthes with query
-   GET `/api/v1/doctors/:id` - Get a doctor by ID
-   POST `/api/v1/doctors` - Create a new doctor
-   PUT `/api/v1/doctors/:id` - Update a doctor's details
-   DELETE `/api/v1/doctors/:id` - Delete a doctor

### Patients

-   GET `/api/v1/patient` - Get all patients
-   GET `/api/v1/patient/:id` - Get a patient by ID
-   POST `/api/v1/patient` - Create a new patient
-   PUT `/api/v1/patient/:id` - Update a patient's details
-   DELETE `/api/v1/patient/:id` - Delete a patient

### Appointments

-   GET `/api/v1/appointment/` - Get all appointments
-   GET `/api/v1/appointment/my/:date` - Get appointment details of logged in user by date
-   GET `/api/v1/appointment/:id` - Get an appointment details
-   POST `/api/v1/appointment/` - Book an appointment
-   PUT `/api/v1/appointments/:id` - Confirm an appointment by doctor

## Acknowledgments

-   Inspired by various healthcare management systems.
-   Special thanks to my friends for their support and encouragement throughout the development of this project.

### Instructions for Use:

1. Replace `rishabhdas1006` and `vitalink` with your GitHub username and the repository name.
2. Update any project-specific details such as features, API endpoints, and other necessary information.
3. Add or modify sections as required based on your project's specifics.

Feel free to reach out if you need any more help!
