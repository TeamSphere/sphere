# TheSphere.Online

TheSphere.Online is a Twitter clone web application that allows users to post and interact with short messages in real-time.

## Technologies Used

The project utilizes the following technologies:

- Socket.IO: Enables real-time bidirectional communication between the server and the clients.
- JavaScript: The programming language used for client-side interactivity.
- MongoDB: A NoSQL database used for storing user data and tweets.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward schema-based solution for modeling application data.
- HTML: The standard markup language for creating the structure of web pages.
- CSS: The language used for styling the user interface.
- Node.js: A JavaScript runtime environment that allows executing JavaScript code outside of a browser.

## Setup Instructions

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/TheSphere.Online.git`
2. Install the required dependencies by running `npm install`.
3. Set up the MongoDB database and update the connection string in the project configuration files.
4. Start the server using the command `node server.js`.
5. Open your browser and visit `http://localhost:3000` to access TheSphere.Online.

## Project Structure

The project structure is organized as follows:

- `server.js`: The entry point of the Node.js server.
- `public/`: Contains static assets, such as HTML, CSS, and client-side JavaScript files.
- `routes/`: Defines the server-side routes and API endpoints.
- `models/`: Contains Mongoose models for interacting with the MongoDB database.
- `controllers/`: Handles the business logic and data processing.
- `views/`: Contains the server-side views (e.g., EJS templates) for rendering dynamic HTML.

Feel free to explore the codebase for more details on how the application works.

## Contributing

Contributions are welcome! If you would like to contribute to TheSphere.Online, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
