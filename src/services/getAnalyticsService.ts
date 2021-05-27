import { IGetAnalyticsInput } from '../interfaces/IAnalyticsInput'
import { getErrorInfo } from '../shared/getErrorInfo'
import { models } from '../models/index.models'

export const getAnalyticsService: Function = async (
  dataInput: IGetAnalyticsInput
): Promise<any[]> => {
  const { dateFrom, dateTo, excludeIp } = dataInput

  try {
    const resFound = await models.analytics
      .find(
        {
          dateCreate: { $gte: dateFrom, $lte: dateTo },
          'initData.ip': { $nin: excludeIp },
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
