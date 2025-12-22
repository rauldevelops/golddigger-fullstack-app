import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGoldPrices } from './handlers/routeHandlers.js'
import { handlePost } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
  console.log(`Received ${req.method}: ${req} request to ${req.url}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api') {
    return await handlePost(req, res)
  } else if (req.url.startsWith('/price/live')) {
    return await handleGoldPrices(req, res);
  } else {
    await serveStatic(req, res, __dirname);
  }
  
});

server.listen(PORT, () => console.log(`Server connected on port: ${PORT}`));