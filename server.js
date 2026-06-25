const express = require('express');
const cors = require('cors');
const app = express();
const PLATFORM = process.env.PLATFORM || 'unset';

app.use(cors()); // allow all origins (test app) so the FE's cross-origin fetch works

app.get('/health', (_req, res) => res.status(200).send('ok'));

// Catch-all: any path returns an identity payload so we can SEE which
// platform/instance served the request and that the path was preserved.
app.all('*', (req, res) => {
  res.json({
    service: 'backend',
    platform: PLATFORM,
    host: req.headers.host,
    path: req.originalUrl,
    method: req.method,
    ts: new Date().toISOString(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`[backend] platform=${PLATFORM} listening on :${port}`));
