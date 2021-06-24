import { IGetAnalyticsInput } from '../interfaces/IAnalyticsInput'
import { getErrorInfo } from '../shared/getErrorInfo'
import { models } from '../models/index.models'

export const getAnalyticsService: Function = async (
  dataInput: IGetAnalyticsInput
): Promise<any[]> => {
  const { dateFrom, dateTo, excludeIPs, urlPattern } = dataInput
  try {
    const resFound = await models.analytics
      .find(
        {
          dateCreate: { $gte: dateFrom, $lte: dateTo },
          'initData.ip': { $nin: excludeIPs },
          'initData.href': {
            $regex: new RegExp(urlPattern),
            $options: 'i',
          },
        },
        { _id: 0, __v: 0 }
      )
      .exec()

    return resFound
  } catch (error) {
    getErrorInfo(error)
    return []
  }
}
