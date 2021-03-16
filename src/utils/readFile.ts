import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

export async function readDB<T>(file: string): Promise<T[]> {
  try {
    const readFileAsync = promisify(fs.readFile);
    const db = await readFileAsync(
      path.resolve(__dirname, '..', 'db', `${file}.json`),
      { encoding: 'utf-8' },
    )

    if (!db) {
      return []
    }

    return JSON.parse(db)
  } catch (err) {
    console.log(err)
    throw new Error(`File not found: ${file}`)
  }
}
