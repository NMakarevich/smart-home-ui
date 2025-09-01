export interface DashboardsInterface {
  id: string;
  title: string;
  icon: string;
}

export interface DashboardInterface {
  tabs: Tab[];
}

export interface Tab {
  id: string;
  title: string;
  cards: CardInterface[];
}

export interface CardInterface {
  id: string;
  title: string;
  layout: CardLayoutType;
  items: ItemInterface[];
}

export type CardLayoutType =
  | 'horizontalLayout'
  | 'verticalLayout'
  | 'singleDevice';

type ItemType = 'sensor' | 'device';

export interface ItemInterface {
  id: string;
  icon: string;
  label: string;
  type: ItemType;
  value?: Value;
  state?: boolean;
}

export interface Value {
  amount: number;
  unit: string;
}
