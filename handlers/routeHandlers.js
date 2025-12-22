import { getGoldPrice } from '../utils/getGoldPrice.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewData } from '../utils/addNewData.js'
import { sendResponse } from '../utils/sendResponse.js'

export async function handleGoldPrices(req, res) {

  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

setInterval(() => {
    let goldPrice = getGoldPrice()

    res.write(
      `data: ${JSON.stringify({
        event: 'price-update',
        goldPrice: goldPrice
      })}\n\n`
    )
  }, 3000)

}

export async function handlePost(req, res) {

  try {
    const parsedBody = await parseJSONBody(req)
    await addNewData(parsedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
  } catch(err) {
    sendResponse(res, 400, 'application/json', {error: err})
  }

}