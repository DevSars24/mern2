MERN2 Project

Overview

This is a MERN (MongoDB, Express.js, React, Node.js) stack application designed to facilitate a contact form feature. The project includes a backend API for handling messages and a frontend built with Vite and React.

Tech Stack





Frontend:





React: A JavaScript library for building user interfaces.



Vite: A next-generation frontend tooling for fast development and builds.



Axios: For making HTTP requests to the backend API.



React Hot Toast: For displaying toast notifications.



Tailwind CSS: For styling (used inline in this case for simplicity).



Backend:





Node.js: JavaScript runtime for server-side logic.



Express.js: Web framework for building the RESTful API.



MongoDB: NoSQL database for storing contact messages.



Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.



Cors: Middleware to enable Cross-Origin Resource Sharing.



Dotenv: For managing environment variables.



Development Tools:





ESLint: For code linting and maintaining code quality.



Git: For version control.

Installation





Clone the repository:

git clone <repository-url>



Navigate to the project directory:

cd MERN2



Install backend dependencies:

cd backend
npm install



Install frontend dependencies:

cd ../frontend
npm install



Set up environment variables:





Create a config.env file in backend/config/ with the following:

PORT=4000
MONGO_URI="your-mongodb-connection-string"
FRONTEND_URL=http://localhost:5173



Replace your-mongodb-connection-string with your actual MongoDB URI.



Run the application:





Start the backend:

cd backend
node server.js



Start the frontend:

cd ../frontend
npm run dev

Challenges Faced





CORS Issues: Initially, the frontend (running on http://localhost:5173) could not communicate with the backend (running on http://localhost:4000) due to Cross-Origin Resource Sharing (CORS) restrictions. This required configuring the cors middleware and ensuring the FRONTEND_URL environment variable was correctly loaded from config.env.



Environment Variable Loading: There was a challenge in loading the .env file correctly. The relative path in dotenv.config({ path: "./config/config.env" }) needed to be adjusted based on the execution directory, leading to undefined FRONTEND_URL values until the correct path was verified.



Database Connection: Setting up and testing the MongoDB connection with Mongoose required ensuring the MONGO_URI was valid and the schema (messageSchema.js) was properly defined to avoid validation errors.



Error Handling: Implementing robust error handling for form submissions, including validation errors from Mongoose, was challenging and required custom logic in the controller.

Error Handling with Middlewares

The project implements error handling using Express middlewares and custom logic in controllers to manage various scenarios:





CORS Middleware:





Configured in app.js to handle CORS policies:

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});



This ensures the frontend can make requests to the backend and handles preflight requests.



Request Parsing Middleware:





app.use(express.json()) and app.use(express.urlencoded({ extended: true })) are used to parse JSON and URL-encoded data from incoming requests.



Custom Error Handling in Controller:





In messageController.js, errors are caught and handled:

try {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }
  await Message.create({ name, email, subject, message });
  res.status(200).json({
    success: true,
    message: "Message Sent Successfully!",
  });
} catch (error) {
  if (error.name === "ValidationError") {
    let errorMessage = "";
    if (error.errors.name) errorMessage += error.errors.name.message + " ";
    if (error.errors.email) errorMessage += error.errors.email.message + " ";
    if (error.errors.subject) errorMessage += error.errors.subject.message + " ";
    if (error.errors.message) errorMessage += error.errors.message.message + " ";
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Unknown Error",
  });
}



This handles validation errors from Mongoose and unknown server errors, returning appropriate HTTP status codes and messages.



Frontend Error Handling:





In Contact.jsx, errors from the axios.post request are caught and displayed using react-hot-toast:

try {
  const res = await axios.post("http://localhost:4000/api/v1/message/send", { name, email, subject, message }, { headers: { "Content-Type": "application/json" }, withCredentials: true });
  toast.success(res.data?.message || "Message sent!");
} catch (error) {
  const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
  toast.error(errorMsg);
}

Usage





Navigate to http://localhost:5173 in your browser.



Fill out the contact form with your name, email, subject, and message.



Click "Send Message" to submit the form. A success or error toast will appear based on the backend response.

Contributing

Feel free to fork this repository and submit pull requests. Please ensure code quality with ESLint and test changes thoroughly.

License

This project is licensed under the MIT License.
