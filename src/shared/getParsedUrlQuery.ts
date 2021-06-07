/**
 * @description Function parse and return object fron url query string
 * @param url
 * @returns
 */
export const getParsedUrlQuery: Function = (url: string): any => {
  if (!url) return {}
  var query = url.substr(1)
  var result = {}
  query.split('&').forEach(function (part) {
    var item = part.split('=')
    result[item[0]] = decodeURIComponent(item[1])
  })
  return result
}
