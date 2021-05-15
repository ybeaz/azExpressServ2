import * as fs from 'fs'
var { join } = require('path')

import { getReadFile } from './getReadFile'

const getWrittenSiteMap = async () => {
  const baseUrl = 'https://yourails.com'

  const pathContentInfo = join(
    __dirname,
    '..',
    'assets/appBrowser/contentInfo.json'
  )

  const contentInfo = await getReadFile(pathContentInfo)
  const { courses } = contentInfo

  const path = join(__dirname, '..', 'assets/general')

  let string = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `

  courses.forEach(course => {
    const { courseID, capture } = course
    const slug = capture.split(' ').join('-')
    string += `<url><loc>${baseUrl}/c/${courseID}/${slug}</loc><lastmod>${new Date().toISOString()}</lastmod></url>
      `
  })

  string += `</urlset>`

  const fileName = '/sitemap.xml'
  const filePath = `${path}${fileName}`

  await fs.writeFileSync(filePath, string)

  console.info('sitemap.xml is updated, file:', filePath)
}

getWrittenSiteMap()
