import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

interface Pages {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number
  paginate: (num: number) => void;
}

function Pagination({
  postsPerPage, totalPosts, paginate, currentPage,
} : Pages) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const pageNum = [];
    for (let i = 0; i < 5; i += 1) {
      pageNum.push(i + 1);
    }
    setPageNumbers(pageNum);
  }, []);

  function nextPage(current: number) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    if (current < totalPages) {
      const pageNum = [];
      const lastItem = pageNumbers[pageNumbers.length - 1];
      if (current === lastItem) {
        paginate(current + 1);
        for (let i = 0; i < 5; i += 1) {
          let increaseSize;
          if (totalPages - lastItem < 5) {
            increaseSize = totalPages % 5;
          } else {
            increaseSize = 5;
          }
          pageNum.push(pageNumbers[i] + increaseSize);
        }
        setPageNumbers(pageNum);
      } else {
        paginate(current + 1);
      }
    }
  }

  function prevPage(current: number) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    if (current > totalPages % 5) {
      const pageNum = [];
      const firstItem = pageNumbers[0];
      if (current === firstItem) {
        paginate(current - 1);
        for (let i = 0; i < 5; i += 1) {
          let increaseSize;
          if (firstItem < 5) {
            increaseSize = totalPages % 5;
          } else {
            increaseSize = 5;
          }
          pageNum.push(pageNumbers[i] - increaseSize);
        }
        setPageNumbers(pageNum);
      } else {
        paginate(current - 1);
      }
    }
  }

  return (
    <div className="container mx-auto">
      <nav>
        <ul className="d-flex justify-content-center flex-wrap my-1">
          <li className={currentPage <= Math.ceil(totalPosts / postsPerPage) % 5 ? 'hover-color-inactive' : 'hover-color'}>
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              onClick={() => prevPage(currentPage)}
              onKeyDown={() => prevPage(currentPage)}
            />
          </li>
          {pageNumbers.map((num) => (
            <li key={num} className={num === currentPage ? 'page-selected' : 'undefined'}>
              <button
                type="button"
                onClick={() => paginate(num)}
                className={num === currentPage ? 'page-selected fw-bold' : 'undefined'}
              >
                {num}
              </button>
            </li>
          ))}
          <li
            className={
              Math.ceil(totalPosts / postsPerPage) - pageNumbers[pageNumbers.length - 1]
              < Math.ceil(totalPosts / postsPerPage) % 5
                ? 'hover-color-inactive' : 'hover-color'
            }
          >
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              onClick={() => nextPage(currentPage)}
              onKeyDown={() => nextPage(currentPage)}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
