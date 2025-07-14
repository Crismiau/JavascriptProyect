# 🚀 User and Product Management SPA

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**✨ A complete project for user and product management with authentication, roles, and CRUD using JavaScript, HTML, CSS, and json-server. ✨**

</div>

---

## 📖 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [📦 Installation](#-installation)
- [🎮 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [👥 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎯 About the Project

SPA (Single Page Application) for managing users and products, with authentication, roles (admin/user), route protection, and full CRUD, connected to a simulated backend using **json-server**.

### 🌟 Main Features

- **User authentication** (login and logout)
- **Roles:** admin and regular user
- **Route protection** based on role
- **Full CRUD for users and products**
- **Dynamic navigation** based on role
- **Connection with json-server** as a fake backend
- **Modern and responsive UI**
- **Friendly validations and alerts**

---

## ✨ Features

| Feature                    | Description                                                          | Status   |
| -------------------------- | -------------------------------------------------------------------- | -------- |
| 🔐 **Login & Roles**       | Authentication and access control based on user role                 | ✅ Ready |
| 👤 **User CRUD**           | Create, edit, delete, and list users (admin only)                    | ✅ Ready |
| 📦 **Product CRUD**        | Create, edit, delete, and list products (admin only for create/edit) | ✅ Ready |
| 👁️ **Product View**        | All users can view products                                          | ✅ Ready |
| 🛡️ **Route Protection**    | Restricted access to pages based on role                             | ✅ Ready |
| 🧭 **Dynamic Navigation**  | Menu changes based on role and session state                         | ✅ Ready |
| 💾 **Local Persistence**   | Session and data management in localStorage                          | ✅ Ready |
| ⚡ **Responsive & Modern** | Visually attractive and adaptable UI                                 | ✅ Ready |

---

## 🚀 Getting Started

### Requirements

- **Node.js** (v14+)
- **npm**
- **json-server** (to simulate the backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/your-project-name.git](https://github.com/Crismiau/Reto-SPA.git)
   cd your-project-name
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start json-server**
   ```bash
   npx json-server --watch db.json --port 3000
   ```
4. **Open the `index.html` file in your browser**

---

## 🎮 Usage

- **Login:** Log in with an existing user (see `db.json`) or create a new one (admin only).
- **Navigation:** The menu and options change according to your role.
- **CRUD:**
  - Only admins can create, edit, or delete users and products.
  - Regular users can only view products.
- **Logout:** Use the button in the nav to log out and clear the local session.

---

## 🏗️ Project Structure

```
ExamJavascript/
├── db.json                # Simulated database (users, products)
├── index.html             # Main SPA entry point
├── js/
│   ├── crud.js            # CRUD functions for users and products
│   ├── formHandlers.js    # Form logic and rendering
│   ├── navigation.js      # SPA navigation and route protection
│   └── spa.js             # Initialization and global events
├── pages/
│   ├── users.html         # Users view
│   ├── products.html      # Products view
│   ├── login.html         # Login view
│   └── newuser.html       # New user form
├── styles/
│   └── styles.css         # Modern and responsive styles
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## 👥 Author

**Cristian Agudelo** - _Lead Developer_ - [My Github](https://github.com/crismiau)

---

## 🙏 Acknowledgments

- **Riwi**: For the challenge and inspiration to create this project.
- **json-server**: For making frontend development easier by simulating a real backend.
- **OpenAI**: For help with code generation and support.

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

**Made with ❤️ and lots of ☕**

</div>
