# Project FrontEnd
This project contains the frontend code for Book Store. It is built with React using Create React App as a starting point.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Clone the Repository](#clone-the-repository)
   - [Configure AppSettings](#configure-appsettings)
   - [Install Dependencies](#install-dependencies)
   - [Run the Frontend](#run-the-frontend)
2. [Functionality](#functionality)

This repository contains the backend code for the BookStore. It provides RESTful APIs for managing books and authors.

## Getting Started

### Prerequisites

To run the frontend, you need to have Node.js installed on your machine. You can download Node.js from the official website and follow the installation instructions.

We recommend using Visual Studio Code as your code editor for working with React. It provides excellent support for JavaScript and React development.

- [Node.js](https://nodejs.org/en) (16.16 and above)
- [Visual Studio Code](https://code.visualstudio.com/) (for local development and testing)

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/kyriakosgeorgiades/bookstore.git
 ```

Change into the project folder:
```bash
cd bookStore
```

### Configure AppSettings

Before running the application, make sure to update the `AppSettings.json` file with your local development settings:
For the sake of the exercises, the user id and password are in the settings in the repository ready to be used.

### Install Dependencies
Before running the frontend, you need to install the project dependencies using npm:

```bash
npm install
```

### Run the Frontend
```bash
npm start
```

Side Note: If you change the port of the API please adapt the ```apiUrl``` in the ```enviroment/enviorment.ts```

This will run the app in development mode. Open http://localhost:3000 in your browser to view it.

## Functionality
The frontend allows users to view and search all books. Users who are logged in can also create, edit, and delete a book.

Please make sure that the backend is running and providing the necessary APIs for the front end to function properly.

