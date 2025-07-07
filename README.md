# GreenFields: Farm Labor Management System 🌾

GreenFields is a comprehensive web-based application designed to streamline the management of farm labor details. It provides an intuitive platform for farm owners and managers to efficiently track current, deleted, and past workers, ensuring organized record-keeping and easy access to essential information.

## 🚜🌱Features

* **Worker Profiles:** Create and manage detailed profiles for each farm worker, including personal information, contact details, emergency contacts, and identification documents.
* **Status Tracking:** Clearly categorize workers as "**Current**," "**Deleted**" (for temporarily removed workers who might return), or "**Archived**" (for permanently past workers).
* **Attendance Management (Planned):** Future integration for tracking daily attendance, hours worked, and breaks.
* **Payment Tracking (Planned):** Future integration for managing wages, advances, and payment history.
* **Search & Filter:** Easily search for specific workers using various criteria (name, ID, status, etc.) and filter results for quick access.
* **Reporting (Basic):** Generate basic reports on worker numbers by status. (More advanced reporting planned).
* **User Roles & Permissions (Planned):** Implement different user roles (e.g., administrator, manager) with varying access levels to ensure data security.
* **Secure Data Storage:** Your worker data is stored securely in a **MongoDB database**, ensuring confidentiality and integrity.
* **Intuitive User Interface:** A clean and user-friendly interface makes it easy for anyone to navigate and use the system.

---

## 🌱Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js
* **Database:** MongoDB Compass

---

## 🌱Getting Started

### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager) or Yarn
* MongoDB Community Server (or access to a MongoDB Atlas cluster)
* MongoDB Compass (optional, for GUI-based database management)

### Installation
1.  **Clone the repository**


2.  **Install backend dependencies:**

    ```bash
    cd backend # Navigate into the backend directory
    npm install
    ```

3.  **Configure your environment variables:**

    Create a `.env` file in the `backend` directory and add your MongoDB connection string.

    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/greenfields_db
    ```

    (Replace `mongodb://localhost:27017/greenfields_db` with your actual MongoDB connection string if it's hosted elsewhere.)

4.  **Install frontend dependencies:**

    ```bash
    cd ../frontend # Navigate into the frontend directory
    npm install
    ```

5.  **Start the backend server:**

    ```bash
    cd ../backend # Ensure you are in the backend directory
    npm start
    ```

    The backend server will typically run on `http://localhost:3000` (or the `PORT` you configured).

6.  **Open the frontend:**

    Navigate to the `frontend` directory and open the `welcome.html` file in your web browser. Depending on your setup, you might use a live server extension in your IDE (like VS Code's Live Server) for better development experience.

---

## 🌱Usage

1.  **Access the Application:** Once the backend server is running, open the `welcome.html` file from the `frontend` directory in your web browser.
2.  **Login/Register:** You'll likely encounter a login/registration page first. Follow the prompts to create an administrator account.
3.  **Add New Worker:** Navigate to the "Workers" section and click on "**Add New Worker**" to create a new profile.
4.  **Manage Workers:** View a list of all workers. You can edit their details, change their status (**Current, Deleted, Archived**), or view their history.
5.  **Search & Filter:** Use the search bar and filter options to quickly find specific workers.

---
