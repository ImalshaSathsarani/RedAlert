# 🩸 BloodConnect Backend - MERN Stack

This is the backend of the **Community-Based Blood Donation + Emergency Alerts System** developed for the **Idealize Competition**. It enables real-time blood requests, emergency alerts, donor matching, and hospital/blood bank management.

---

## 🚀 Features

- 🔐 User registration & authentication (JWT-based)
- 🩸 Donor/Receiver/Hospital profiles with blood type, availability, location
- 🆘 Real-time blood request system with emergency prioritization
- 📍 Interactive blood bank map support (via APIs)
- 🔔 SMS/Email/Push notifications to donors
- 📊 Admin dashboard for request & inventory management
- 📅 Donation history tracking with eligibility reminders
- 📌 Location-based filtering & geo-detection
- 🧪 OTP verification & secure user data handling

---

## 🛠️ Tech Stack

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT** for auth
- **Nodemailer / Twilio** for notifications
- **Socket.IO** for real-time alerts (planned)
- **Google Maps API** (for blood bank map)

---

## 📁 Folder Structure

backend/
├── config/ # DB config
├── controllers/ # Route handlers
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── middleware/ # Auth & error middleware
├── utils/ # Helper services (OTP, email, SMS)
├── .env # Environment variables
├── server.js # Entry point
└── README.md # Project info



---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bloodconnect-backend.git

# Navigate to the project
cd backend

# Install dependencies

npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemailer twilio
npm install --save-dev nodemon


⚙️ Environment Variables (.env)

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE=your_twilio_number


▶️ Running the Server

# Run with nodemon for development
npm run dev

# Or run normally
node server.js

📌 Contributors
👩‍💻 Nathasha Florin — Backend Developer
👩‍💻 Dewni - Backend Developer

💡 Idealize Competition Team