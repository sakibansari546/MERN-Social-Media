Social Media Project
Overview
This project started as a 2-step authentication system and has been expanded into a full-featured social media application. The goal of this project is to provide practice with various web development features and technologies, including user management, post creation, and profile management.

Features
User Authentication: Secure user login and registration with 2-step authentication.
User Profiles: Create, update, and view user profiles.
Post Management: Create, view, and manage individual user posts.
User Feed: Display posts from all users in a feed format.
Profile Updates: Allow users to update their profile information, including their bio and profile picture.
Technologies Used
Frontend: React.js, Tailwind CSS, Axios
Backend: Node.js, Express, MongoDB
Authentication: JSON Web Tokens (JWT), bcrypt
Email Verification: Nodemailer, Mailtrap
Getting Started
Prerequisites
Node.js and npm installed
MongoDB installed and running
Installation
Clone the repository

bash
Copy code
git clone <repository-url>
cd <project-directory>
Install dependencies

For the backend:

bash
Copy code
cd backend
npm install
For the frontend:

bash
Copy code
cd frontend
npm install
Configuration

Create a .env file in the backend directory and add the necessary environment variables. Example:

env
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<your-email-user>
EMAIL_PASS=<your-email-password>
Run the application

Start the backend server:

bash
Copy code
cd backend
npm start
Start the frontend server:

bash
Copy code
cd frontend
npm start
The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000 (or your configured port).

Usage
Signup and Signin: Register a new user or sign in with existing credentials.
Verify Email: Complete email verification using the provided OTP.
Create Posts: Create and view posts in your feed.
Update Profile: Edit your profile information including bio and profile picture.
Future Enhancements
Real-time Updates: Implement real-time updates using WebSockets or a similar technology.
Search and Filters: Add search and filtering capabilities for posts and users.
Notifications: Implement a notification system for user interactions.
Contributing
Feel free to open issues or submit pull requests. Contributions and feedback are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

