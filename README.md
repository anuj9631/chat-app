💬 Chat App

A real-time chat application built with React, Node.js, Express, and Socket.io that allows users to sign up, log in, chat with others, see online status, and update their profiles — all in real time.
Live link : https://chat-app-akdev.vercel.app/
🚀 Features

🔐 User Authentication (Signup, Login, Logout)

💬 Real-time Messaging using Socket.io

🟢 Online/Offline Status for each user

📂 Profile Update with image upload

🧠 Persistent Chat History (Messages saved in database)

⚡ Typing Indicator (optional enhancement)

🕓 Timestamps for each message

🧱 Clean UI with React Context for Auth and Chat management

🧩 Tech Stack
Category	Technologies Used
Frontend	React.js, Tailwind CSS / CSS, React Router, Context API
Backend	Node.js, Express.js, Socket.io
Database	MongoDB (Mongoose)
Authentication	JWT (JSON Web Token)
Other Tools	React Hot Toast, Multer (for file upload), dotenv


⚙️ Installation and Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/chat-app.git
cd chat-app

2️⃣ Install Dependencies
For Server
cd server
npm install

For Client
cd ../client
npm install

3️⃣ Setup Environment Variables

In the server directory, create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

▶️ Running the App
Start the Server
cd server
npm run dev

Start the Client
cd client
npm run dev


The app will be available at http://localhost:5173
 and backend at http://localhost:5000
.

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/users/signup	Register a new user
POST	/api/users/login	Log in existing user
GET	/api/users/check	Check user authentication
PUT	/api/users/update-profile	Update profile details
GET	/api/messages/:id	Fetch messages with a specific user
POST	/api/messages/send/:id	Send a message to a user
💡 Context Overview
AuthContext

Manages user authentication

Handles signup, login, logout, and profile updates

ChatContext

Handles selected user, online users, and messages

Manages Socket.io connections for real-time chat

🧠 Common Issues

1️⃣ Getting logged out after refresh?
→ Add a persistent login by storing JWT in localStorage and verifying it on page load.

2️⃣ CORS Error?
→ Make sure your backend uses:

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))


3️⃣ Socket not connecting?
→ Verify frontend and backend URLs match and are on the same port range.

🧰 Future Enhancements

🧑‍🤝‍🧑 Group Chats

📷 Image/Media Sharing

🧑‍💼 Admin Panel

🌙 Dark Mode

📱 PWA Support

👨‍💻 Author

Anuj Kumar
]

📜 License

This project is licensed under the MIT License – feel free to use, modify, and distribute it.
