const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// React routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/book', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/updatebook', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/addbook', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// New endpoints
app.post('/api/Books/Post', (req, res) => {
  // Handle the request here
  res.send('Hello from /api/Books/Post !');
});

app.delete('/api/Books/Delete', (req, res) => {
  // Handle the request here
  res.send('Received a Delete request at /api/Books/Delete !');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = http.createServer(app);

server.listen(process.env.PORT || 3001, "localhost", () => {
    console.log("Server running at http://localhost:3001/");
});