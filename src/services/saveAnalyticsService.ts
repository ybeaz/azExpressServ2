const moment = require('moment')
import { nanoid } from 'nanoid'

import { getErrorInfo } from '../shared/getErrorInfo'
import { getUniqArrBy } from '../shared/getUniqArrBy'
import { models } from '../models/index.models'
import { getAssetHash } from '../shared/getAssetHash'
import { getArrToSave } from '../shared/getArrToSave'

// Stopped here

export const saveAnalyticsService = async dataInput => {
  let {
    analyticsInput: {
      analyticsID: analyticsIDInput,
      hash256: hash256Input,
      initData: initDataInput,
      topic: topicInput,
      event: eventInput,
      target: targetInput,
    },
  } = dataInput

  try {
    const resFound =
      analyticsIDInput &&
      (await models.analytics
        .find({ analyticsID: analyticsIDInput }, { _id: 0, __v: 0 })
        .exec())

    const resFound0 = resFound && resFound[0] ? resFound[0] : {}

    const {
      analyticsID: analyticsIDFound,
      initData = {},
      topics = [],
      events = [],
      targets = [],
    } = resFound0

    let reqCase: string
    let set: any
    let analyticsID: string
    const dateCurrent: number = +new Date()
    const hash256 = getAssetHash(dataInput)

    /**
     * @description Case I. Initial data request
     */
    if (!analyticsIDInput && initDataInput) {
      analyticsID = nanoid()
      set = {
        analyticsID,
        dateCreate: dateCurrent,
        initData: initDataInput,
      }
      reqCase = 'initData'
    }

    /**
     * @description Case II. Update topics
     */
    if (analyticsIDInput && analyticsIDFound && topicInput) {
      analyticsID = analyticsIDInput
      const topicsUniq = [...new Set([topicInput, ...topics])]
      set = {
        topics: topicsUniq,
      }
      reqCase = 'topics'
    }

    /**
     * @description Case III. Update events
     */
    if (analyticsIDInput && analyticsIDFound && eventInput) {
      analyticsID = analyticsIDInput
      set = {
        events: [eventInput, ...events],
      }
      reqCase = 'events'
    }

    /**
     * @description Case IV. Update targets
     */
    if (analyticsIDInput && analyticsIDFound && targetInput) {
      analyticsID = analyticsIDInput
      set = {
        targets: [targetInput, ...targets],
      }
      reqCase = 'targets'
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
      topics: topicsNext = {},
      events: eventsNext = {},
      targets: targetsNext = {},
    } = resFoundNext[0]

    return {
      analyticsID,
      hash256,
      dateCreate,
      dateUpdate,
      initData: initDateNext,
      topics: topicsNext,
      events: eventsNext,
      targets: targetsNext,
    }
  } catch (error) {
    getErrorInfo(error)
    return {}
  }
}
