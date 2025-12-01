# Employee Management (CRUD) — Fullstack

**Tech stack**

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express + Mongoose (MongoDB)
- DB: MongoDB Atlas (or local MongoDB)

---

package.json
"dependencies": {
"autoprefixer": "^10.4.22",
"axios": "^1.13.2",
"postcss": "^8.5.6",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"react-router-dom": "^7.9.6",
"tailwindcss": "^3.4.1"
},
"devDependencies": {
"@eslint/js": "^9.39.1",
"@types/react": "^19.2.5",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^5.1.1",
"eslint": "^9.39.1",
"eslint-plugin-react-hooks": "^7.0.1",
"eslint-plugin-react-refresh": "^0.4.24",
"globals": "^16.5.0",
"vite": "npm:rolldown-vite@7.2.5"
},
"overrides": {
"vite": "npm:rolldown-vite@7.2.5"
}

type: module

to run
cd employee-frontend
npm install
npm run dev
cd employee-backend
npm init -y
nodemon server.js

.env files

add you your mongodb uri
localhost =8888

## Demo / Screenshots

(Add screenshots or link to live demo here)

---

## Repo structure

project-root/
├─ server.js
├─ package.json
├─ src/
│ ├─ controllers/
│ ├─ models/
│ ├─ routes/
│ ├─ middlewares/
│ └─ db.js
├─ frontend/
│ ├─ package.json
│ └─ src/
├─ .env.example
├─ .gitignore
└─ README.md

curl -X POST http://localhost:5000/api/employees \
 -H "Content-Type: application/json" \
 -d '{"name":"Alice","email":"alice@example.com","phone":"9999999999"}'
