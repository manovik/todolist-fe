import React from 'react';

export interface PageBtnProps {
  pageNumber: number;
  changePage(num: number): void;
}

const PageBtn: React.FC<PageBtnProps> = ({ pageNumber, changePage }) => {
  const getPageNumber = (): number => {
    changePage(pageNumber);
    return pageNumber;
  };

  return (
    <button className="todos__page-btn" onClick={getPageNumber}>
      {pageNumber}
    </button>
  );
};

export default PageBtn;
