export const VC_SOCKET_EVENTS = {
  tickerSubscribe: 'vc:ticker:subscribe',
  tickerUnsubscribe: 'vc:ticker:unsubscribe',
  tickerSnapshot: 'vc:ticker:snapshot',
  tickerUpdate: 'vc:ticker:update',
  orderbookSubscribe: 'vc:orderbook:subscribe',
  orderbookUnsubscribe: 'vc:orderbook:unsubscribe',
  orderbookUpdate: 'vc:orderbook:update',
  orderbookError: 'vc:orderbook:error',
} as const;