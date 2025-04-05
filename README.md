# 🥫 Fridge-N-Pantry

A backend-focused inventory tracker designed to help users manage what food they have at home. The application allows for tracking of items, categorization, and automatic generation of shopping lists based on usage and expiration patterns.

---

## 🚀 Why This Project Matters

Fridge-N-Pantry demonstrates backend architecture skills, including:

- Modular routing and middleware structure
- Mongoose models for data validation and structure
- RESTful API design principles
- Unit testing with mocked data
- Focus on scalability and separation of concerns

It’s built with reusability in mind — perfect as the foundation for a full-stack grocery planner or meal-prep app.

---

## 🧠 Features

- 📦 **Item Tracking**: Keep an up-to-date list of pantry and fridge items
- 🧾 **Auto Shopping List**: Automatically generate shopping lists based on inventory
- 🧪 **Unit Tested**: Includes test coverage for models and route behavior
- 🔄 **CRUD Operations**: Add, update, delete items and categories
- 📁 **Structured API**: Clean routes and middleware for scalable backend design

---

## ⚙️ Tech Stack

| Layer        | Tools                      |
|--------------|----------------------------|
| Backend      | Node.js, Express           |
| Database     | MongoDB, Mongoose          |
| Testing      | Jest                       |
| Structure    | MVC + modular routing      |

---

## 📦 Installation

> Requires **Node.js v18+** and **MongoDB running locally or in the cloud**

1. Clone the repo:

```bash
git clone https://github.com/nbuzzerio/Fridge-N-Pantry.git
cd Fridge-N-Pantry
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root:

```bash
MONGODB_URI=mongodb://localhost:27017/fridge
PORT=3000
```

4. Run the server:

```bash
npm start
```

## 🧪 Running Tests

```bash
npm test
```


## 📂 Project Structure

```
Fridge-N-Pantry/
├── models/           # Mongoose schemas for food items and categories
├── routes/           # Express route definitions
├── middleware/       # Custom middleware (e.g., error handling)
├── startup/          # App initialization logic
├── tests/            # Unit tests for core modules
├── index.js          # Server entry point
├── package.json
└── .env.example
```

## 🧑‍💻 Developer Takeaways
This project demonstrates my ability to:

- 🧱 Design modular and testable backend systems with Express + MongoDB
- ⚙️ Implement real-world data models using Mongoose
- 🧪 Write maintainable unit tests using Jest
- 📦 Structure codebases for scalability and readability
