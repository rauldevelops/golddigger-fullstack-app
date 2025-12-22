export async function parseJSONBody(req) {
  let body =''
  for await(const chunk of req) {
    console.log(chunk.body)
  }

  try {
    return JSON.parse(body)
  } catch(err) {
    throw new Error(`Invalid JSON format: ${err}`)
  }
}