/**
 * @description Function to return unique array of objects
 * @param props 
 * @param arrInp 
 * @returns 
 */
export const getUniqArrBy: Function = (props: string[] = [], arrInp: any[] = [{}]): any[] => {
  const objKey = {}
  return arrInp.reduce((res: any[], item: any) => {
    const valStr = props.reduce((res2: string, prop: string) => `${res2}${item[prop]}`, '')
    if (objKey[valStr]) return res
    objKey[valStr] = item
    return [...res, item]
  }, [])
}