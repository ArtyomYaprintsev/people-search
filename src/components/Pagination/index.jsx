import React from "react";

const Pagination = ({ setPage, lastPage = 1, currentPage = 1, ...props }) => {
  return (
    <nav {...props}>
      {currentPage > 2 && (
        <button
          type='button'
          onClick={() => setPage(1)}
          title='Go to first page'
        >
          &lt;&lt; First
        </button>
      )}
      <button
        type='button'
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage < 2}
        title='Go to previous page'
      >
        &lt; Prev
      </button>
      <span className='current-page' title='Current page'>
        Page {`${currentPage} / ${lastPage}`}
      </span>
      <button
        type='button'
        onClick={() => setPage(currentPage + 1)}
        disabled={!lastPage || currentPage >= lastPage}
        title='Go to next page'
      >
        Next &gt;
      </button>
      {lastPage - currentPage >= 2 && (
        <button
          type='button'
          onClick={() => setPage(lastPage)}
          title='Go to last page'
        >
          Last &gt;&gt;
        </button>
      )}
    </nav>
  );
};

export default Pagination;
