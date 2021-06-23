export interface IInitData {
  width: number
  height: number
  search: string
  pathname: string
  hostname: string
  href: string
  referrer: string
}

export interface ITopic {
  name: string
  pathname: string
}

export interface IEvent {
  type: string
  name: string
  value: string
  level: number
  pathname: string
}

export interface IAnalyticsInput {
  analyticsID?: string
  hash256?: string
  initData?: IInitData
  event?: IEvent
  ip?: string
}

export interface IGetAnalyticsInput {
  dateFrom: number
  dateTo: number
  excludeIPs?: string[]
  matchesUrlPattern?: string
}
