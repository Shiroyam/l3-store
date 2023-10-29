import { ProductData } from 'types';

export enum EventType {
  ROUTE = 'route',
  VIEW_CARD = 'viewCard',
  ADD_TO_CARD = 'addToCard',
  PURCHASE = 'purchase'
}

interface OrderPayload {
  orderId: string;
  totalPrice: string;
  productIds: number[];
}

type ViewCardPromo = ProductData & { log: any };

type Payload =
  | { url: string }
  | { productData: ProductData | ViewCardPromo; secretKey: number }
  | ViewCardPromo
  | ProductData
  | OrderPayload;

interface Action {
  type: EventType;
  payload: Payload;
  timestamp: number;
}

class Analytics {
  url: string = '/api/sendEvent';

  async sendEvent(action: Action) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      });

      if (!response.ok) {
        console.error('Failed to send event');
        return;
      }

      console.log('Event sent successfully!:', action);
    } catch (error) {
      console.log(error);
    }
  }
}

export const analytics = new Analytics();
