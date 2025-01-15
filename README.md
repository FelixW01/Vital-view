# Vital View

## Live Website 
https://vital-view-e7d695ab1868.herokuapp.com/

## Description
Welcome to Vital View, a full-stack application designed to help individuals track their blood sugar levels, discover food recommendations for managing glucose levels, and emphasize the importance of community well-being. This application is built using Express, Node.js, JavaScript, MySQL, and Handlebars. It provides a simple yet powerful tool to track glucose levels and receive personalized dietary recommendations based on blood sugar readings.

## Table of Contents
- [App Demo](#app-demo)
- [Installation](#installation)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## App Demo
Click to view video
[![Watch the video](https://img.youtube.com/vi/y24iWClk2cc/maxresdefault.jpg)](https://youtu.be/y24iWClk2cc)


## Installation
To run locally, follow these steps:

1. Clone the repository using the following command:
    ```bash
    git clone https://github.com/FelixW01/power-project.git
    ```

2. Navigate to the project directory:
    ```bash
    cd vital-view
    ```
    
3. Install all required Node.js dependencies by running:
    ```bash
    npm install
    cd server/npm install
    ```

4. Make sure you have MySQL installed and running. Then, create a new database for the application:
    ```bash
    CREATE DATABASE vital_view;
    ```
    
5. Create a .env file in the root of the project directory and add the following environment variables:
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=vital-view
    SESSION_SECRET=your_secret_key
    ```
6. Once the dependencies are installed and the database is set up, start the application by running:
    ```bash
    npm run dev
    ```
7. The app should now be running locally. Open your browser and go to:
    ```bash
    http://localhost:3000
    ```
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## Contributing
Felix Willem, Andrea Merlos, Jennifer Guzman, Kevin Castro Guzman, Nate Sherer
## Questions
If you have any questions please contact me via github: FelixW01 or Email: felixwillem01@yahoo.com.
