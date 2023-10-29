import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice, genUUID } from '../../utils/helpers';
import { EventType, analytics } from '../../services/analytic.service';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';

class Checkout extends Component {
  products!: ProductData[];
  totalPrice = 0

  async render() {
    this.products = await cartService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    this.totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(this.totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();

    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });

    analytics.sendEvent({
      type: EventType.PURCHASE, 
      payload: {
        orderId: genUUID(),
        totalPrice: formatPrice(this.totalPrice),
        productIds: this.products.map(product => product.id)
      }, 
      timestamp: Date.now()
    })

    window.location.href = '/?isSuccessOrder';
  }
}

export const checkoutComp = new Checkout(html);
