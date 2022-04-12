import { CardsPerPage } from "../../constants.js";
import _ from 'lodash';

const Pagination = (props) => {
    // console.log(pages.pages.length);
    // console.log(props.pages);
    // console.log(props.currentPage);
    const pagesCount = props.pages.length;

    const pagination = (pageNo) => {
        props.setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * CardsPerPage;
        const paginatedCards = _(props.dataDoctors).slice(startIndex).take(CardsPerPage).value();
        props.setPaginatedCards(paginatedCards);
    }

    const prevPage = () => {
        if (props.currentPage - 1 < 1) {
            return null;
        }
        props.setCurrentPage(prevState =>
            prevState - 1
        );
        const startIndex = (props.currentPage - 2) * CardsPerPage;
        const paginatedCards = _(props.dataDoctors).slice(startIndex).take(CardsPerPage).value();
        props.setPaginatedCards(paginatedCards);
    }

    const nextPage = () => {
        if (props.currentPage + 1 > pagesCount) {
            return null;
        }

        props.setCurrentPage(prevState =>
            prevState + 1
        );

        const startIndex = (props.currentPage) * CardsPerPage;
        const paginatedCards = _(props.dataDoctors).slice(startIndex).take(CardsPerPage).value();
        props.setPaginatedCards(paginatedCards);
    }

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
            <ul className="pagination">
                <li className={props.currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <a className="page-link" onClick={() => prevPage()} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {props.pages.length > 0
                    ? props.pages.map((page) => (
                        <li key={page} className={page === props.currentPage ? "page-item active" : "page-item"}>
                            <p className="page-link" style={style.paginationParagraph} onClick={() => pagination(page)}>{page}</p>
                        </li>
                    ))
                    : null
                }
                <li className={props.currentPage + 1 > pagesCount ? "page-item disabled" : "page-item"}>
                    <a className="page-link" onClick={() => nextPage()} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;

const style = {
    paginationParagraph: {
        cursor: 'pointer'
    }
}