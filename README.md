# React-Practical-7

# **User Management React App**

This project is a user management application built with React, Redux, and Formik. It allows users to sign up, log in, view their profile information, and log out.

## **Getting Started**

To get started with the project, follow the instructions below.

### Deployment Link

```jsx
https://ireact-practical-7.netlify.app/login
```

### **Installation**

1. Clone the repository:

   ```
   git clone https://github.com/zilenmodi/React-Practical-7.git
   ```

2. Install the dependencies:

   ```
   npm install
   ```

### **Running the App**

To run the application, use the following command:

```
npm run dev
```

## **Features**

### **Sign Up**

- Access the sign-up page at **http://localhost:5173/signup**.
- Fill in the required fields (Name, Email, Phone Number, Password, Confirm Password, and Profile Picture).
- The following validations are applied:
  - Name: Required, minimum length of 15 characters.
  - Email: Required, valid email format.
  - Phone Number: Required, valid Indian phone number format.
  - Password and Confirm Password: Must match.
  - Profile Picture: Must be in JPG or PNG format and less than 2MB.

### **Home Page**

- Access the home page at **http://localhost:5173/home** (requires authentication).
- If the user is logged in, their profile picture, name, email, and phone number will be displayed.
- The user can click the "Logout" button at the top right to log out and be redirected to the sign-up page.

## **Routing**

- The app uses React Router for routing.
- Two routes are configured:
  - **`/signup`**: Sign-up page (accessible without authentication).
  - **`/login`**: Login page (accessible without authentication).
  - **`/home`**: Home page (accessible only after authentication).
- If a user tries to access the home page without logging in, they will be redirected to the sign-up page.
- If a user tries to access the sign-up page after logging in, they will be redirected to the home page.

## **Technologies Used**

- React
- Redux
- Formik
- React Router DOM
