import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGoldPrices, handlePost } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer( async (req, res) => {

  if (req.url.startsWith('/api')) {
    if (req.method === 'POST') {
      return await handlePost(req, res)
    }

  } else if (req.url.startsWith('/price/live')) {

      return await handleGoldPrices(req, res)
    
  } else {

    await serveStatic(req, res, __dirname)
  
  }
})

server.listen(PORT, () => console.log(`Server connected on port: ${PORT}`))