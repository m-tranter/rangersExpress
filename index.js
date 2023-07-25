// An app to interface with the Contensis Management & Delivery APIs.
'use strict';

// Modules.
//import {} from 'dotenv/config'
import express from 'express';
import fetch from 'node-fetch';

// Set some variables.
const port = 3001;
const ROOT_URL = `https://cms-chesheast.cloud.contensis.com/`;
const PROJECT = 'website';

// Start the server.
const app = express();
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

// Log all request to the server
const myLogger = function (req, _, next) {
  if (!req.url.startsWith('/?')) {
    console.log(`Incoming: ${req.url}`);
  }
  next();
};

// Use ejs for templating.
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(myLogger);

async function getEntries(res) {
  const response = await fetch(
    `${ROOT_URL}/api/delivery/projects/${PROJECT}/contenttypes/rangerEvents/entries?accessToken=QCpZfwnsgnQsyHHB3ID5isS43cZnthj6YoSPtemxFGtcH15I&versionStatus=latest`,
    { method: 'get' }
  );
  const data = await response.json();
  console.log(
    data.items ? `Got ${data.items.length} entries.` : 'No data.'
  );
 res.render('index', { data}); 
}

// Routes
app.all('/rangersevents*', function (_, res) {
  getEntries(res);
});

app.use((_, res) => {
  res.status(404).send('Page not found');
});

