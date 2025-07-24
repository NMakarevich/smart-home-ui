export interface SmartHomeResponse {
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
