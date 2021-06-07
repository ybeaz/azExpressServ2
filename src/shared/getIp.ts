/**
 * @description Function to extract ip from expressJs request
 * @param req
 * @returns
 */
export const getIp: Function = (req: any): string => {
  let ip = ''
  if (
    req &&
    req.headers !== undefined &&
    req.headers['x-forwarded-for'] !== undefined
  ) {
    ip = req.headers['x-forwarded-for']
  } else if (
    req !== undefined &&
    req.connection !== undefined &&
    req.connection.remoteAddress !== undefined
  ) {
    ip = req.connection.remoteAddress
  }
  return ip
}
