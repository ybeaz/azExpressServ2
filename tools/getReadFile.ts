import { promises as fs } from 'fs'

export const getReadFile = async path => {
  const data = await fs.readFile(path, 'utf8')
  return JSON.parse(data)
}
