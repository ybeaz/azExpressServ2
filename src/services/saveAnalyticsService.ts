import { nanoid } from 'nanoid'

import { IAnalyticsInput } from '../interfaces/IAnalyticsInput'
import { getErrorInfo } from '../shared/getErrorInfo'
import { getUniqArrBy } from '../shared/getUniqArrBy'
import { models } from '../models/index.models'
import { getAssetHash } from '../shared/getAssetHash'

export const saveAnalyticsService: Function = async (
  analyticsInput: IAnalyticsInput
): Promise<any> => {
  let {
    analyticsID: analyticsIDInput,
    hash256: hash256Input,
    ip,
    initData: initDataInput,
    event: eventInput,
  } = analyticsInput

  try {
    const resFound =
      analyticsIDInput &&
      (await models.analytics
        .find({ analyticsID: analyticsIDInput }, { _id: 0, __v: 0 })
        .exec())

    const resFound0 = resFound && resFound[0] ? resFound[0] : {}

    const { analyticsID: analyticsIDFound, events = [] } = resFound0

    let reqCase: string
    let set: any = {}
    let analyticsID: string
    const dateCurrent: number = +new Date()
    const hash256 = getAssetHash(analyticsInput)

    /**
     * @description Case I. Initial data request
     */
    if (!analyticsIDInput && initDataInput) {
      analyticsID = nanoid()
      set = {
        ...set,
        analyticsID,
        dateCreate: dateCurrent,
        initData: { ...initDataInput, ip },
      }
      reqCase = 'initData'
    }

    /**
     * @description Case II. Update events
     */
    if (analyticsIDInput && analyticsIDFound && eventInput) {
      analyticsID = analyticsIDInput
      const event = { ...eventInput, dateCreate: dateCurrent }
      set = {
        ...set,
        events: [event, ...events],
      }
      reqCase = 'events'
    }

    /**
     * @description Eventually update the database
     */
    const resUpdate =
      ((!analyticsIDInput && initDataInput) ||
        (analyticsIDInput && analyticsIDFound)) &&
      (await models.analytics
        .updateMany(
          { analyticsID },
          {
            $set: { dateUpdate: dateCurrent, ...set },
          },
          { upsert: true }
        )
        .exec())

    const resFoundNext = await models.analytics
      .find({ analyticsID }, { _id: 0, __v: 0 })
      .exec()

    const {
      dateCreate,
      dateUpdate,
      initData: initDateNext = {},
      events: eventsNext = {},
    } = resFoundNext[0]

    return {
      analyticsID,
      hash256,
      dateCreate,
      dateUpdate,
      initData: initDateNext,
      events: eventsNext,
    }
  } catch (error) {
    getErrorInfo(error)
    return {}
  }
}
