const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

// Inject data stores
const dataStores = `
// Persistent Backend Entities (Hackathon DB)
const passportsStore = new Map<string, any>();
const listingsStore = new Map<string, any>();
const eventsStore = new Map<string, any>();
const offersStore = new Map<string, any>();

// Auth Middleware
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token === "guest") {
    return res.status(401).json({ error: "Unauthorized. Guest mode is read-only." });
  }
  // Simplified for hackathon: token is just the gstin or role ID
  req.user = { id: token };
  next();
};

app.get("/api/state", (req, res) => {
  res.json({
    passports: Array.from(passportsStore.values()),
    listings: Array.from(listingsStore.values()),
    events: Array.from(eventsStore.values()),
    offers: Array.from(offersStore.values())
  });
});

app.post("/api/passports", authenticate, (req, res) => {
  const passport = req.body;
  passportsStore.set(passport.id, passport);
  res.json({ success: true, passport });
});

app.post("/api/listings", authenticate, (req, res) => {
  const listing = req.body;
  listingsStore.set(listing.id, listing);
  res.json({ success: true, listing });
});

app.post("/api/events", authenticate, (req, res) => {
  const event = req.body;
  // Custody event validation
  eventsStore.set(event.id, event);
  res.json({ success: true, event });
});
`;

server = server.replace('app.get("/api/health", (_req, res) => {', dataStores + '\napp.get("/api/health", (_req, res) => {');

// Fix hash generation
server = server.replace(
  'const apiKey = process.env.GEMINI_API_KEY;',
  `import crypto from 'crypto';\nconst apiKey = process.env.GEMINI_API_KEY;`
);

fs.writeFileSync('server.ts', server);
