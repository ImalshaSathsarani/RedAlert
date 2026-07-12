# RedAlert / ReadAlert

RedAlert is a full-stack blood donation and emergency-response platform designed to connect donors and hospitals through a mobile app, a web portal, and an intelligent eligibility prediction system.

The platform helps users:
- register as donors or recipients
- request or respond to blood emergencies
- view hospital and blood bank information
- receive real-time notifications
- check whether they are currently eligible to donate blood using an ML-powered assessment

Live Web Portal: https://red-alert-zeta.vercel.app/

---

## Project Overview

RedAlert brings together three core experiences:

1. ReadAlert Mobile App
   - Built with Expo and React Native
   - Used by donors and users for registration, eligibility screening, donation history, community updates, and notifications

2. ReadAlert Web Portal
   - Built with React
   - Provides web-based access for hospital and admin workflows, requests, dashboards, and content management

3. Machine Learning Eligibility Model
   - Built with Python, Flask, scikit-learn, pandas, and joblib
   - Predicts whether a person is eligible to donate blood based on health and lifestyle inputs

---

## Key Features

### Mobile App Features
- Donor registration and login
- Blood donation eligibility questionnaire
- Eligibility result screen with recommendations
- Donation history tracking
- Community posts and donor engagement
- Notifications for requests and updates
- Profile management

### Web Portal Features
- Admin and hospital-facing dashboard experience
- Blood request management
- Community and notification workflows
- Web-based access for coordination and monitoring

### ML Model Features
- Predicts donation eligibility from health questionnaire data
- Supports categorical and multi-select inputs
- Uses preprocessing pipelines and trained classifiers
- Exposes a REST API for prediction

---

## Tech Stack

### Frontend (Mobile App)
- React Native
- Expo
- TypeScript
- Tailwind CSS via NativeWind
- React Navigation
- Axios

### Web Frontend
- React
- React Router
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.IO
- Nodemailer / Twilio / Expo push notifications

### Machine Learning Service
- Python
- Flask
- pandas
- scikit-learn
- joblib

---

## Project Structure

```text
RedAlert/
├── backend/                 # Main Node.js backend for app APIs
├── backend_web/             # Web portal backend with admin/hospital APIs
├── frontend/                # Expo React Native mobile app
├── web_frontend/            # React web portal frontend
├── EligibilityCheckingModel/ # Python ML model and prediction API
├── package.json             # Root package wrapper
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or later)
- npm or yarn
- Python 3.9+
- MongoDB
- Expo CLI (for running the mobile app)

---

## 1. Clone the Repository

```bash
git clone (https://github.com/ImalshaSathsarani/RedAlert.git)
cd RedAlert
```

---

## 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on:
- http://localhost:5000

---

## 3. Run the Web Backend

```bash
cd backend_web
npm install
npm run dev
```

The web backend runs on:
- http://localhost:8000

---

## 4. Run the Web Frontend

```bash
cd web_frontend
npm install
npm start
```

The web portal will open on:
- http://localhost:3000

---

## 5. Run the Mobile App

```bash
cd frontend
npm install
npx expo start
```

You can run the app in:
- Expo Go
- Android emulator
- iOS simulator
- web preview

---

## 6. Run the ML Eligibility API

```bash
cd EligibilityCheckingModel
pip install flask joblib pandas scikit-learn
python app.py
```

The ML service runs on:
- http://localhost:5001

---

## Environment Variables

Create a .env file in the backend and backend_web folders with the required configuration values such as:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

For the ML service, ensure the model files in the EligibilityCheckingModel folder are present:
- BloodDonationEligibilityModel3.joblib
- LabelEncoders3.joblib

---

## ML Model Details

The eligibility prediction service uses a trained classifier to estimate whether a donor is currently eligible to donate blood.

### Input Fields
The model considers factors such as:
- age
- weight
- gender
- chronic illness history
- medication use
- recent illnesses or surgery
- allergies
- vaccinations
- smoking and alcohol habits
- recent travel or tattoos/piercings
- pregnancy or menstruation status
- days since the last donation

### API Endpoint
The Flask service exposes:

```http
POST /eligibilityPredict
```

Example request body:

```json
{
  "Age": 24,
  "Weight": 68,
  "Gender": "Male",
  "ChronicIllness": "No",
  "Medications": "No",
  "ColdFever7Days": "No",
  "Surgery6Months": "No",
  "Allergies": "No",
  "Vaccinated4Weeks": "No",
  "SmokingHabits": "No",
  "AlcoholDrinking": "No",
  "InternationalTravel3Months": "No",
  "TattoosPiercings6Months": "No",
  "TestedPositiveInfectious": "No",
  "PregnantBreastfeedingMenstruating": "No",
  "LastDonationDate": "2024-01-01"
}
```

Response:

```json
{
  "result": true
}
```

---

## Live Demo

Hosted Web Portal:
- https://red-alert-zeta.vercel.app/

---





## License

This project is currently intended for educational and project-demo purposes.

---

## Contact

For questions or collaboration, contact the project team through the repository maintainers.
