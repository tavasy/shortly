# Shortly

This project is a **URL Shortener** that allows users to shorten the provided links, making them easier to share. It stores the original and shortened URLs in a **MongoDB** database using a defined schema. The project is built using **Next.js**, **TailwindCSS**, **ShortID** for generating short URLs, and **Node.js** on the backend.

## Features

- **Link Shortening**: Users can input a long URL, and the system generates a shorter, easy-to-share version of the URL.
- **Copy to Clipboard**: Users can copy the shortened URL to their clipboard for easy sharing.
- **Link Validation**: The system ensures that the URL provided is valid before shortening.
- **Schema for MongoDB**: The project uses Mongoose with a defined schema for storing URLs.

### URL Schema

```js
const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
```

## Technologies Used

- **Next.js**: For server-side rendering and React-based frontend.
- **MongoDB**: To store original and shortened URLs.
- **Mongoose**: For interacting with the MongoDB database and defining schemas.
- **TailwindCSS**: For styling and responsive design.
- **ShortID**: For generating unique, short URL identifiers.
- **Node.js**: The backend environment.

## Getting Started

To get this project running locally, follow these steps:

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.
- **MongoDB**: You need access to a MongoDB database (either locally or through MongoDB Atlas).
- **Environment Variables**: Create a `.env.local` file in the root of the project and define your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Running the Project

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000` to see the application running locally.

## Usage

1. **Input a URL**: Enter the long URL you want to shorten in the input field.
2. **Submit**: Click the "Shorten" button to generate a shortened URL.
3. **Copy the Short URL**: Once the URL is shortened, you can copy it to the clipboard by clicking the "Copy" button.

## Future Improvements

- Add **user authentication** to manage and track shortened URLs.
- Implement **analytics** to monitor how many times a shortened link has been accessed.
- Allow users to customize their short URLs.
