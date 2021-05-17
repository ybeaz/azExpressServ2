/**
 * @description Function to return obj reduced to arr fields
 * @borrows both server and client
 */
export const arrReduceObjPropsConsistent = (obj, arr) => {
  if (!obj) {
    return {}
  }

  let objNext = {}
  let consistency = true
  arr.forEach(item => {
    // console.info('arrReduceObjPropsConsistent [5]', { consistency, item, 'obj[item]': obj[item], 'typeof': typeof obj[item] !== 'undefined' })
    if (consistency && obj[item] !== undefined) {
      objNext[item] = obj[item]
    } else {
      consistency = false
      objNext = {}
    }
  })
  return objNext
}