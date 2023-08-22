# simple-quiz-server
The backend for the simple-quiz Vue.js app is built using Node.js and Express. It employs MySQL for data storage and JWT for authentication.

The backend application for the "Simple Quiz App" is an API interface built using the Node.js programming language and the Express.js framework. This application aims to provide multiple services for the simple quiz application, offering a powerful and secure user interface for managing quizzes and users.

**Key Features:**

1. **Quiz Listing and Quiz Display:**
   The application allows users to view a list of all available quizzes, including details such as the title and description. Users can also access specific details about a particular quiz through the interface.

2. **Login or New Account Creation:**
   Users can log in using their credentials or create a new account if they are not registered yet. Passwords are securely encrypted using the bcryptjs library to ensure data security.

3. **Control Panel:**
   The application includes a control panel that enables registered users to manage their quizzes. Users can create new quizzes, edit existing ones, and delete unwanted quizzes.

**Security and Authentication Techniques:**

1. **MySQL Database:**
   The application employs a MySQL database to store information about quizzes, users, and authentication.

2. **JWT (JSON Web Tokens):**
   JWT authentication is used to secure access to resources. After successful login, a JWT token is issued and used in each request to verify the user's identity.

3. **Password Encryption using bcryptjs:**
   Passwords are hashed using bcryptjs before being stored in the database, ensuring the confidentiality and security of user data.

4. **Slug Creation using Slugify:**
   The application utilizes the Slugify library to create slugs (a URL-friendly version of the title with spaces or invalid characters removed) for quizzes. This enhances the user experience when accessing links.

**Conclusion:**

The backend interface for the "Simple Quiz App" has been designed and implemented using the latest security practices and reliable technologies. The API interface provides essential functions for managing quizzes and users in an easy and secure manner, offering users an efficient and trustworthy experience while using the application.
