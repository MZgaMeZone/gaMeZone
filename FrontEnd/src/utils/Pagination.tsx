import { useState } from 'react';
import styled from 'styled-components';

interface PageType {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: PageType) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 이전페이지 이동 버튼
  const prevHandler = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // 다음페이지 이동 버튼
  const nextHandler = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    } else {
      alert('마지막 페이지입니다.');
    }
  };

  // 현재 페이지 기준으로 보여줄 페이지 번호의 범위 계산
  const getPageRange = () => {
    const maxDisplayPages = 5;
    const middlePage = Math.ceil(maxDisplayPages / 2);
    let startPage = currentPage - middlePage + 1;
    let endPage = currentPage + middlePage - 1;

    if (startPage <= 0) {
      startPage = 1;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
    }

    if (totalPages <= maxDisplayPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (startPage === 1) {
        endPage = Math.min(maxDisplayPages, totalPages);
      }

      if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxDisplayPages + 1);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <>
      {pageNumbers.length > 1 && (
        <PageNav>
          <Button onClick={prevHandler} disabled={currentPage < 1}>
            이전
          </Button>
          <PageNation>
            {getPageRange().map((number) => (
              <PageNationList key={number}>
                <PageLink
                  onClick={() => paginate(number)}
                  style={{
                    fontWeight: currentPage === number ? 'bold' : 'normal',
                  }}
                >
                  {number}
                </PageLink>
              </PageNationList>
            ))}
          </PageNation>
          <Button onClick={nextHandler} disabled={currentPage > totalPages}>
            다음
          </Button>
        </PageNav>
      )}
    </>
  );
};

export default Pagination;

const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 1rem;
  font-size: 1.7rem;
`;

const PageNation = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 12rem;
`;

const PageNationList = styled.li`
  margin: 0.5rem;
`;

const PageLink = styled.a`
  cursor: pointer;
`;

const Button = styled.button`
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;
