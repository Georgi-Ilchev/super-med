import { CardsPerPage } from "../../constants.js";
import _ from 'lodash';

const Pagination = (props) => {
    // console.log(pages.pages.length);
    // console.log(props.pages);
    // console.log(props.currentPage);

    const pagination = (pageNo) => {
        props.setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * CardsPerPage;
        const paginatedCards = _(props.dataDoctors).slice(startIndex).take(CardsPerPage).value();
        props.setPaginatedCards(paginatedCards);
    }

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        {/* <span className="sr-only">Previous</span> */}
                    </a>
                </li>
                {props.pages.length > 0
                    ? props.pages.map((page) => (
                        <li key={page} className={page === props.currentPage ? "page-item active" : "page-item"}>
                            {/* <a className="page-link" href="#">{page}</a> */}
                            <p className="page-link" style={style.paginationParagraph} onClick={() => pagination(page)}>{page}</p>
                        </li>
                    ))
                    : null
                }
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        {/* <span className="sr-only">Next</span> */}
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