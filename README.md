

# EcoHub

EcoHub is a MERN stack web application designed to provide users with a platform to read articles about energy efficient home appliances and new eco-friendly energy sources, purchase products related to energy-efficient home appliances and solar panels, and register for upcoming seminars related to energy-efficient products and technologies.

## Installation and Setup

1. Clone the repository from Github.

   ```
   git clone https://github.com/Pabasaraa/EcoHub.git
   ```

2. Navigate into the project directory.

   ```
   cd EcoHub
   ```

3. Install the dependencies for both the backend and frontend of the project.

   ```
   cd frontend
   ```
   ```
   npm install
   ```
   ```
   cd ../backend
   ```
   ```
   npm install
   ```

4. Create a `.env` file in the root directory of the backend and set the following environment variables:
   ```
   MONGO_URI = <mongo-db-connection-uri>
   PORT = <port-number>
   JWT_SECRET_KEY = <jwt-secret>
   ```
5. Start the client.

   ```
   cd frontend
   npm start
   ```

6. Start the server concurrently on a new terminal.

   ```
   cd backend
   npm start
   ```

7. Access the web application on your browser at `http://localhost:3000/`.


## Features

### Articles
Users can read articles about energy-efficient home appliances and new eco-friendly energy sources. The articles are displayed on the home page and can be accessed individually by clicking on their respective titles. Users can also search for specific articles using the search bar.

### Online Store
Users can buy solar panels, inverters, energy-efficient home appliances, and other related products from the online store. The store features a cart system that allows users to add and remove items from their cart and checkout using their preferred payment method.

### Seminars
Users can view details of upcoming physical seminars related to energy-efficient products and technologies and register themselves for these seminars. The seminars are displayed on the home page and can be accessed individually by clicking on their respective titles. 

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js

## Contributors

- [Withana W. A. S. P.](https://github.com/Pabasaraa)
- [Kulasekara D. C. V.](https://github.com/chavikulasekara)
- [Navodi P. T.](https://github.com/IT20639662)
