import { getDateString } from './getDateString'

export const getErrorInfo: Function = (error: Error, plus: any = {}): any => {
  const { stack, message } = error
  const stackArr = stack.split('\n')
  const date = getDateString({ second: true })
  try {
    const fileName =
      stackArr[1] &&
      !!stackArr[1].match(/([\w\-\. ]+\.[\w]+):/gim) &&
      stackArr[1].match(/([\w\-\. ]+\.[\w]+):/gim)[0].replace(/[/:]+/gim, '')
    const row =
      stackArr[1] &&
      !!stackArr[1].match(/:[\d]{1,}/gim) &&
      Number(stackArr[1].match(/:[\d]{1,}/gim)[0].replace(/[/:]+/gim, ''))
    const col =
      stackArr[1] &&
      !!stackArr[1].match(/:[\d]{1,}/gim) &&
      Number(stackArr[1].match(/:[\d]{1,}/gim)[1].replace(/[/:]+/gim, ''))
    const errorLine1 = stackArr[1]
    const self = { fileName, row, col, message, errorLine1, date, ...plus }
    console.info('[error]', self)
    return self
  } catch (error) {
    console.info('[error]', { message, stack, date, ...plus })
  }
}
