import _ from "lodash";

export const returnPagiationRange = (totalPages, page, limit, siblings) => {
    let totalPagesNotInArray = 7 + siblings;
    if (totalPagesNotInArray >= totalPages) {
        return _.range(1, totalPages + 1);
    }
    let leftSiblingsIndex = Math.max(page - siblings, 1);
    let rightSiblingsIndex = Math.min(page + siblings, totalPages);

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < totalPages - 2;

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRange = _.range(1, leftItemsCount + 1);
        return [...leftRange, " ...", totalPages];
    } else if (showLeftDots && !showRightDots) {
        let rightItemsCount = 3 + 2 * siblings;
        let rightRange = _.range(totalPages - rightItemsCount + 1, totalPages + 1);
        return [1, "... ", ...rightRange];
    } else {
        let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
        return [1, "... ", ...middleRange, " ...", totalPages];
    }
}

export function usePaginationHandler(setPage, curentPage, totalPages) {
    return function handlePageChange(value) {
        if (value === "&laquo;" || value === "... ")
            setPage(1);
        else if (value === "&lsaquo;") {
            if (curentPage !== 1)
                setPage(curentPage - 1);
        }
        else if (value === "&rsaquo;") {
            if (curentPage !== totalPages)
                setPage(curentPage + 1);
        }
        else if (value === "&raquo;" || value === " ...") {
            setPage(totalPages);
        }
        else {
            setPage(value);
        }
    };
}
