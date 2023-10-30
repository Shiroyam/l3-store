import { View } from '../../utils/view';
import { ViewTemplate } from '../../utils/viewTemplate';
import html from './searchHelper.tpl.html';

export interface Tips {
  id: number;
  title: string;
  path: string;
}

export class SearchHelper {
  view: View;
  tips: Tips[];

  constructor() {
    this.tips = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(tips: Tips[]) {
    this.tips = tips;
    this.render();
  }

  render() {
    const searchChildren = this.view.root.children;

    this.tips.forEach((tip, index) => {
      if(!searchChildren[index]) return;

      const element: HTMLAnchorElement  = searchChildren[index] as HTMLAnchorElement

      element.innerHTML = `<span class="tip">${tip.title}</span>`
      element.setAttribute("href", tip.path)
    });
  }
}

