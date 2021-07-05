import { Component } from 'react';
import PageBtn from './PageBtn';
import './todo_pages.scss';

export interface PageBarProps {
  itemsOnPage: number;
  pages: number[];
  changePage(num: number): void;
}

class PageBar extends Component<PageBarProps> {
  render() {
    const { changePage, pages } = this.props;
    return (
      <div className="todos__page-bar">
        {pages?.map((btn) => {
          return <PageBtn key={btn} pageNumber={btn} changePage={changePage} />;
        })}
      </div>
    );
  }
}

export default PageBar;
