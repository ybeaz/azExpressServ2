import { getErrorInfo } from '../shared/getErrorInfo'
import { models } from '../models/index.models'
interface IDataInput {
  dateFrom: number
  dateTo: number
}

export const getAnalyticsService: Function = async (
  dataInput: IDataInput
): Promise<any[]> => {
  const { dateFrom, dateTo } = dataInput

  try {
    const resFound = await models.analytics
      .find(
        {
          dateCreate: { $gte: dateFrom, $lte: dateTo },
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
