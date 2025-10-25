# MERN Contact Form App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-brightgreen)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-orange)](https://vitejs.dev/)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges & Lessons Learned](#challenges--lessons-learned)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that implements a responsive contact form. Users can submit messages via a clean, intuitive frontend interface, which are securely stored in a MongoDB database through a RESTful backend API. Built with modern tools for rapid development, it emphasizes error handling, security, and user feedback.

The app demonstrates real-world practices like CORS configuration, environment variable management, Mongoose validation, and toast notifications for a seamless user experience.

## Features
- **Form Validation**: Client-side (React) and server-side (Mongoose) validation for name, email, subject, and message fields.
- **Secure Submissions**: JWT-ready auth structure (extendable); messages stored with timestamps and validation.
- **Real-Time Feedback**: Toast notifications for success/error states using React Hot Toast.
- **Responsive Design**: Tailwind CSS for mobile-first, accessible UI.
- **API Endpoints**:
  - `POST /api/v1/message/send`: Submit a new message.
- **Admin View Potential**: Easy extension for a dashboard to view/retrieve messages (e.g., via `GET /api/v1/message/all`).

## Tech Stack
```
### Frontend
| Technology | Version | Purpose | Links |
|------------|---------|---------|-------|
| [React](https://reactjs.org/) | 18+ | UI components and state management | [Docs](https://react.dev/) |
| [Vite](https://vitejs.dev/) | 5.0+ | Fast bundling and hot module replacement | [Docs](https://vitejs.dev/guide/) |
| [Axios](https://axios-http.com/) | 1.6+ | HTTP client for API calls | [Docs](https://axios-http.com/docs/intro) |
| [React Hot Toast](https://react-hot-toast.com/) | 2.4+ | User-friendly notifications | [Docs](https://react-hot-toast.com/docs) |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3+ | Utility-first styling | [Docs](https://tailwindcss.com/docs/installation) |

### Backend
| Technology | Version | Purpose | Links |
|------------|---------|---------|-------|
| [Node.js](https://nodejs.org/) | 18+ | Server runtime | [Docs](https://nodejs.org/en/docs/) |
| [Express.js](https://expressjs.com/) | 4.18+ | RESTful API framework | [Docs](https://expressjs.com/en/starter/hello-world.html) |
| [MongoDB](https://www.mongodb.com/) | 4.4+ | NoSQL database | [Docs](https://www.mongodb.com/docs/) |
| [Mongoose](https://mongoosejs.com/) | 8.0+ | MongoDB ODM with schema validation | [Docs](https://mongoosejs.com/docs/) |
| [Cors](https://www.npmjs.com/package/cors) | 2.8+ | Cross-origin resource sharing | [Docs](https://www.npmjs.com/package/cors) |
| [Dotenv](https://www.npmjs.com/package/dotenv) | 16.3+ | Environment variable management | [Docs](https://www.npmjs.com/package/dotenv) |

### Development Tools
- [ESLint](https://eslint.org/): Code linting and style enforcement.
- [Git](https://git-scm.com/): Version control with GitHub integration.
- [Postman](https://www.postman.com/): Recommended for API testing.

## Screenshots
![Contact Form UI](https://via.placeholder.com/800x400?text=Contact+Form+Screenshot) <!-- Replace with actual screenshot URL from your repo -->
> *Submit form with toast success notification.*

![Backend API Response](https://via.placeholder.com/800x200?text=API+Success+Response) <!-- Add API response screenshot -->
> *Sample successful message submission response.*
```
## Installation
1. **Clone the Repository**:
   ```
   git clone https://github.com/DevSars24/MERN2.git  # Replace with your repo URL
   cd MERN2
   ```

2. **Backend Setup**:
   ```
   cd backend
   npm install
   ```

3. **Frontend Setup**:
   ```
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**:
   - Create `backend/config/config.env`:
     ```
     PORT=4000
     MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/contactdb?retryWrites=true&w=majority"  # Use your MongoDB Atlas URI
     FRONTEND_URL=http://localhost:5173
     ```
   - For production, add `NODE_ENV=production` and secure your MONGO_URI.

5. **Run the Application**:
   - **Backend** (in `backend/`):
     ```
     node server.js
     ```
     > Server runs on `http://localhost:4000`.
   - **Frontend** (in `frontend/`):
     ```
     npm run dev
     ```
     > App runs on `http://localhost:5173`.

## Usage
1. Open `http://localhost:5173` in your browser.
2. Fill in the form fields: Name, Email, Subject, Message.
3. Click **Send Message**.
4. View toast notifications for feedback.
5. Check MongoDB collection (`messages`) or test API with Postman:
   ```
   POST http://localhost:4000/api/v1/message/send
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john@example.com",
     "subject": "Inquiry",
     "message": "Hello, I have a question!"
   }
   ```

## Challenges & Lessons Learned
- **CORS Configuration**: Resolved by dynamically setting origins via `process.env.FRONTEND_URL` and handling preflight OPTIONS requests explicitly.
- **Env Var Pathing**: Fixed relative paths in `dotenv.config()` to ensure loading from the correct directory—key for dev/prod parity.
- **MongoDB Integration**: Ensured schema validation with required fields and custom error messages; tested connections with `mongoose.connection.on('error')`.
- **Error Propagation**: Custom try-catch blocks in controllers now bubble up Mongoose `ValidationError` details for precise frontend feedback.
- **Key Takeaway**: Always test end-to-end (form → API → DB) early; tools like MongoDB Compass sped up debugging.

## Error Handling
Robust error management ensures graceful failures:

### Backend Middlewares
- **CORS**:
  ```js
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
  // Additional headers for preflights
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  ```
- **Body Parsing**:
  ```js
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  ```

### Controller-Level Handling (`messageController.js`)
```js
try {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }
  await Message.create({ name, email, subject, message });
  res.status(200).json({ success: true, message: "Message Sent Successfully!" });
} catch (error) {
  if (error.name === "ValidationError") {
    let errorMessage = Object.values(error.errors)
      .map(err => err.message)
      .join(" ");
    return res.status(400).json({ success: false, message: errorMessage });
  }
  console.error("Server Error:", error);  // Log for debugging
  res.status(500).json({ success: false, message: "Server error. Please try again later." });
}
```

### Frontend Handling (`Contact.jsx`)
```js
try {
  const res = await axios.post("http://localhost:4000/api/v1/message/send", 
    { name, email, subject, message }, 
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  toast.success(res.data?.message || "Message sent!");
  // Reset form
  setName(""); setEmail(""); setSubject(""); setMessage("");
} catch (error) {
  const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
  toast.error(errorMsg);
}
```

## Deployment
1. **Backend**:
   - Deploy to [Render](https://render.com/) or [Heroku](https://www.heroku.com/): Push to GitHub, set env vars in dashboard.
   - Update `MONGO_URI` to MongoDB Atlas (free tier).
   - Example Render config: `npm start` with `node server.js`.

2. **Frontend**:
   - Build: `npm run build` (outputs to `dist/`).
   - Deploy to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/): Connect GitHub repo, set build command to `npm run build` and output dir to `dist`.

3. **Full Stack**:
   - Update `FRONTEND_URL` in backend env to production domain (e.g., `https://your-app.vercel.app`).
   - Use MongoDB Atlas for cloud DB.

> *Pro Tip*: Add a CI/CD pipeline with GitHub Actions for automated testing/linting on push.

## Contributing
1. Fork the repo and create a feature branch (`git checkout -b feature/amazing-feature`).
2. Commit changes (`git commit -m 'Add some amazing feature'`).
3. Push to branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request—include tests and lint fixes.
5. Run `npm run lint` before submitting.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines. Issues and stars welcome!

## License
This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.
