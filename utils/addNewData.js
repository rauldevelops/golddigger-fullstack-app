import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'

export async function addNewData(newData) {
  try {
    const data = await getData()
    data.push(newData)
    const pathJSON = path.join('data', 'data.json')
    await fs.writeFile(pathJSON, JSON.stringify(data, null, 2), 'utf8')
  } catch(err) {
    throw new Error(err)
  }
}