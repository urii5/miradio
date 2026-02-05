# Radio URI

A professional, responsive radio web application with built-in admin panel and Icecast streaming integration.

## Features

- **Public Interface**: Minimalist, glassmorphism design with live metadata updates.
- **Admin Panel**: Secure dashboard to manage stream metadata and view statistics.
- **Backend API**: Node.js/Express server with SQLite database.
- **Authentication**: JWT-based security for administrative actions.
- **Streaming**: Native support for Icecast streams.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/radiouri.git
   cd radiouri
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database and admin user:
   ```bash
   node seed.js
   ```

## Configuration

Edit `.env` file to match your environment:
- `PORT`: Server port (default: 3000)
- `ICECAST_SERVER`: URL of your Icecast server
- `JWT_SECRET`: Secure secret for authentication

## Usage

Start the server:
```bash
npm start
```

- Public Radio: `http://localhost:3000`
- Admin Login: `http://localhost:3000/login`

## Deployment

This project is ready for deployment on any Node.js compatible hosting (Heroku, DigitalOcean, Vercel, etc.). Ensure persistent storage for the SQLite database or switch to PostgreSQL/MySQL for ephemeral environments.

## License

MIT
