import { Component } from '../component';
import { SearchHelper, Tips } from '../searchHelper/searchHelper';
import html from './search.tpl.html';

const mockTips: Tips[] = [
  {
    id: 0,
    title: 'чехол iphone 13 pro',
    path: '#'
  },
  {
    id: 1,
    title: 'коляски agex',
    path: '#'
  },
  {
    id: 2,
    title: 'яндекс станция 2',
    path: '#'
  }
];

class Search extends Component {
  searchHelper: SearchHelper

  constructor(props: any) {
    super(props);

    this.searchHelper = new SearchHelper();
    this.searchHelper.attach(this.view.search);
  }

  render() {
    this.searchHelper.update(mockTips);
  }
}

export const searchComp = new Search(html);