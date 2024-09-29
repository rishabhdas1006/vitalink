# VitaLink - Healthcare Appointment Scheduling System

## Description

This is a healthcare appointment scheduling system that allows patients to book appointments with doctors. The application features user authentication, doctor and patient profiles, and a user-friendly interface for managing appointments.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

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

Create a .env file in the root directory and add the following variables:

```bash
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongodb_uri
```
