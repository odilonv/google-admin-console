# Google Admin Console - User Management Dashboard

A modern, full-stack web application replicating the **Google Play Console** aesthetic. This project demonstrates a complete migration from Vanilla JS to a robust **React/TypeScript** architecture, featuring advanced state management, dual-mode backend storage, and strict adherence to **SOLID principles**.

> **Academic Context:** Developed as part of the **INFRES 3A Coursework (TP1-TP3)** at **IMT Mines Alès**.

## 📸 Screenshots

| Light Mode | Dark Mode |
|:-----------:|:------------:|
| ![Light mode](docs/screenshots/screenshot-light.png) | ![Dark mode](docs/screenshots/screenshot-dark.png) |


## ✨ Key Features

### 🎨 UI/UX & Design (TP2 & TP3)

  * **Google Material Design:** Authentic blue gradient overlays, typography, and spacing mimicking the Google Play Console.
  * [cite\_start]**Dark/Light Theme:** Global theme management using React **Context API** with persistent preferences[cite: 49, 50].
  * **Responsive Layout:** Optimized for Desktop, Tablet, and Mobile.

### ⚡ Advanced Data Table (TP1 & TP3)

  * **Server-Side Pagination:** Handles large datasets efficiently.
  * [cite\_start]**Multi-Criteria Filtering:** Filter by ID, Name, Email, Role, or Date simultaneously[cite: 33].
  * **Smart Sorting:** Toggle ascending/descending order on any column.
  * [cite\_start]**State Persistence:** Uses `localStorage` to remember your page, sort order, and active filters even after a refresh[cite: 48].

### 🛠️ Backend Architecture (TP3)

  * **Dual-Mode Storage:**
    1.  [cite\_start]**MongoDB Mode:** Persistent data storage using Mongoose[cite: 56].
    2.  **In-Memory Mode:** Volatile array-based storage for instant testing without DB installation.
  * [cite\_start]**REST API:** Clean endpoints for CRUD operations[cite: 60].
  * **Clean Architecture:** Separation of Concerns (SoC) with Controllers, Services, and Repositories.

-----

## 🚀 Quick Start

**Prerequisites:** Node.js 16+

### 1\. Installation

```bash
# Install Backend dependencies
cd backend && npm install

# Install Frontend dependencies
cd ../frontend && npm install
```

### 2\. Run Application

You can run the application in **Memory Mode** (recommended for grading/testing) or **Database Mode**.

#### 🅰️ Option A: In-Memory Mode (No MongoDB required)

*Ideal for quick evaluation. Data is lost on server restart.*

```bash
# Terminal 1: Start Backend (Memory Mode)
cd backend
npm run start:memory

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

#### 🅱️ Option B: Production Mode (MongoDB)

*Requires a local MongoDB instance running on `localhost:27017`.*

1.  Create a `.env` file in `./backend`:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/users_db
    ```
2.  Start the services:
    ```bash
    # Terminal 1: Start Backend
    cd backend
    npm start

    # Terminal 2: Start Frontend
    cd frontend
    npm run dev
    ```

Access the app at: **[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)**

-----

## 🏗️ Technical Architecture

[cite\_start]This project follows the requirements set in the coursework documentation[cite: 45, 54].

### Frontend (React + TypeScript)

  * [cite\_start]**Components:** Functional components separated into atomic parts (`Header`, `Table`, `Footer`)[cite: 12].
  * [cite\_start]**Hooks:** Custom hooks (e.g., `useTableState`) encapsulate logic for sorting and filtering, keeping the UI clean[cite: 47].
  * [cite\_start]**Context:** `ThemeContext` avoids prop-drilling for style preferences[cite: 52].

### Backend (Node + Express)

Implements the **Strategy Pattern** to switch between storage modes:

```text
backend/
├── controllers/       # Handles HTTP requests/responses
├── services/          # Business logic (Storage agnostic)
├── models/            # Mongoose Schemas & Types
├── routes/            # API Endpoint definitions
├── server.js          # Entry point (MongoDB)
└── server.memory.js   # Entry point (In-Memory)
```

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | Retrieve paginated users (params: `page`, `limit`, `sort`, `filter`) |
| `POST` | `/users` | Create a new user |
| `PUT` | `/users/:id` | Update an existing user |
| `DELETE`| `/users/:id` | Delete a user |

-----

## 📚 Coursework Compliance (TP Evaluation)

This repository satisfies the requirements for **TP 3 (Les États)**:

1.  **State Management:** Implemented via `useState` and custom hooks for the table[cite: 47].
2.  **Persistence:** Filter and sort configurations are saved in LocalStorage[cite: 48].
3.  **Theming:** Global Light/Dark toggle implemented via Context API[cite: 50].
4.  **Backend:** Node.js/Express server providing a JSON REST API[cite: 55, 60].
5.  **Database:** MongoDB integration + In-Memory fallback[cite: 56].

## 👤 Author

**Odilon VIDAL**
*Student at IMT Mines Alès*

-----

*Built with ❤️ using TypeScript, React, and Node.js.*