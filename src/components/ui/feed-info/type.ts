export interface FeedData {
  total: number;
  totalToday: number;
  // Декларируем, что могут быть и другие поля, но мы их не используем
  [key: string]: unknown;
}

export type FeedInfoUIProps = {
  feed: FeedData;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
