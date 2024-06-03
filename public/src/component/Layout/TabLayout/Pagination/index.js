import { returnPagiationRange } from "../../../../utils/appUtils";

function Pagination(props) {
    let array = returnPagiationRange(props.totalPages, props.page, props.limit, props.siblings);
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" ><a className="page-link" href="#" onClick={() => props.onPageChange("&laquo;")}>&laquo;</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => props.onPageChange("&lsaquo;")}>&lsaquo;</a></li>
                    {array.map(value => {
                        if (value === props.page) {
                            return (
                                <li key={value} className="page-item active"><a className="page-link" onClick={() => props.onPageChange(value)}>{value}</a></li>
                        )}
                        else {
                            return (
                                <li key={value} className="page-item"><a className="page-link" href="#" onClick={() => props.onPageChange(value)}>{value}</a></li>

                            )
                        }
                    })}
                    <li className="page-item"><a className="page-link" href="#" onClick={() => props.onPageChange("&rsaquo;")}>&rsaquo;</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => props.onPageChange("&raquo;")}>&raquo;</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;