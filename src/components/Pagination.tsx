import React, {FC} from 'react';

interface Pages {
    postsPerPage: number;
    totalPosts: number;
    currentPage: number
    paginate: (num: number) => void;
}

const Pagination: FC<Pages> = ({postsPerPage, totalPosts, paginate, currentPage}) => {

    const pageNum = []
    for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
        pageNum.push(i+1)
    }

    return (
        <div className='container mx-auto'>
            <nav>
                <ul className='pagination d-flex justify-content-center flex-wrap'>
                    {pageNum.map(num => (
                        <li key={num} className='page-item hover my-1'>
                            <a onClick={() => paginate(num)}
                               className={num === currentPage ? 'page-link page-link-selected' : 'page-link text-success'}>
                                {num}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;