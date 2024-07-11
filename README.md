# ConnectHub

ConnectHub is a real-time chat application built with React.js, Chakra UI, Node.js, Express.js, and MongoDB. It replicates the basic functionality of a chat application, including user authentication (login/signup), searching for users, and sending and receiving messages in real-time.

## Features

- User Authentication (Login/Signup)
- Search for Users
- Send and Receive Messages in Real-Time

## Tech Stack

- **Frontend**: React.js, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (version 14.x or later)
- MongoDB (version 4.x or later)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/connecthub.git
    cd connecthub
    ```

2. **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    ```

3. **Install backend dependencies:**

    ```bash
    cd ../backend
    npm install
    ```

### Configuration

1. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

    The backend server will run on `http://localhost:5000`.

2. **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start
    ```

    The frontend development server will run on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with an existing account.
3. Search for users using the search bar.
4. Start a conversation by selecting a user and sending a message.

## Folder Structure

