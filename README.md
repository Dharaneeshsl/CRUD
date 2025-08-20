## CRUD App (React + Vite • Node/Express • MongoDB)

A simple CRUD application. The UI is a single page where the user form appears on top and the table appears below. You can add new users, edit existing users inline (click the edit icon to populate the form), and delete users from the table.

### Tech Stack
- Frontend: React 19 + Vite, React Router, Bootstrap, React Icons
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

### Project Structure
```
.
├─ backend/                 # Express API
│  └─ src/
│     ├─ controllers/
│     ├─ models/
│     ├─ routes/
│     └─ server.js
└─ Front-end/CRUD/          # React app (Vite)
   └─ src/
      ├─ App.jsx
      ├─ UserForm.jsx
      ├─ UserTable.jsx
      └─ main.jsx
```

### Prerequisites
- Node.js 18+ and npm
- A running MongoDB instance and connection string

### Quick Start

1) Backend (port 5000 by default)
```
cd backend
npm install
```
Create a `.env` file (same folder as `server.js`) with:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```
Then run:
```
npm run start
```

2) Frontend (Vite dev server on 5173)
```
cd Front-end/CRUD
npm install
npm run dev -- --host --port 5173
```
Open: `http://localhost:5173`

### API Endpoints
- GET `/api/users` — list users
- POST `/api/user` — create user
- GET `/api/user/:id` — get one user
- PUT `/api/user/update/:id` — update user
- DELETE `/api/user/delete/:id` — delete user

### Frontend → Backend URL
The frontend calls `http://localhost:5000` by default. If your backend runs elsewhere, update the base URLs in:
- `Front-end/CRUD/src/App.jsx` (create, update, delete, list)
- `Front-end/CRUD/src/UserForm.jsx` (fetch by id)

### UI Usage
- Add: fill the form and click “Add User”.
- Edit: click the pencil icon in the table; the form will load that user. Submit to save or Cancel to exit edit mode.
- Delete: click the trash icon in the table.

### Troubleshooting
- Network Error in the UI:
  - Ensure the backend is running and reachable at the configured host/port.
  - If accessing from a different origin, enable CORS in the backend:
    ```js
    // backend/src/server.js
    import cors from 'cors';
    app.use(cors());
    ```
  - Verify your `.env` has a valid `MONGO_URI` and MongoDB is reachable.

### Scripts
Backend:
```
npm run start   # start express
npm run dev     # start with nodemon
```
Frontend:
```
npm run dev     # start vite dev server
npm run build   # production build
npm run preview # preview production build
```

### License
MIT


