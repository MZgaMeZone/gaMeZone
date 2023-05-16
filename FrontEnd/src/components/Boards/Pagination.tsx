import React from 'react'
import styled from "styled-components";

interface PageType {
  postsPerPage: number,
  totalPosts: number,
  currentPage: number,
  paginate: any,
}

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }: PageType) => {
const pageNumbers = [];

for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
}

    return (
        <PageNav>
            <PageNation>
                {pageNumbers.map(number => (
                    <PageNationList key={number}>
                        <PageLink onClick={() => paginate(number)}>
                            {number}
                        </PageLink>
                    </PageNationList>
                ))}
            </PageNation>
        </PageNav>
    )
}



export default Pagination;

const PageNav = styled.div`
  display: flex;
  align-self: center;
  font-size: 1.4rem;
`

const PageNation = styled.ul`
  
`

const PageNationList = styled.li`
  
`

const PageLink = styled.a`

`;