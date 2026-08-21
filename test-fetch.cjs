const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: "Testing 500" }));
});

server.listen(3005, async () => {
  try {
    const response = await fetch("http://localhost:3005");
    const data = await response.json();
    console.log("Parsed JSON:", data);
  } catch (err) {
    console.error("Fetch threw:", err);
  }
  server.close();
});
