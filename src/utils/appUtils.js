import _ from "lodash";
import { fetchDSDKAction } from "../redux/action/fetchDataAction/fetchDSDKAction";
import { fetchDSHDByIdAction } from "../redux/action/fetchDataAction/fetchHoaDonAction";
import { fetchAllClsAction } from "../redux/action/fetchDataAction/fetchCLSAction";
import { fetchAllBenhNhanAction } from "../redux/action/fetchDataAction/fetchAllBenhNhanAction";
import { fetchDsClsByIdAction } from "../redux/action/fetchDataAction/fetchCLSAction";
import { fetchCTDTByIdAction } from "../redux/action/fetchDataAction/fetchCTDTById";

export const selectAction = (actionName) => {
  switch (actionName) {
    case "DSDK":
      return fetchDSDKAction;
    case "DSCLS":
      return fetchAllClsAction;
    case "DSHD":
      return fetchDSHDByIdAction;
    case "DSBN":
      return fetchAllBenhNhanAction;
    case "CLSBYIDPK":
      return fetchDsClsByIdAction;
    case "CTDTBYIDPK":
      return fetchCTDTByIdAction;
    default:
      return null;
  }
  // make change to test pull request
};

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
};

export function usePaginationHandler(setPage, curentPage, totalPages) {
  return function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") setPage(1);
    else if (value === "&lsaquo;") {
      if (curentPage !== 1) setPage(curentPage - 1);
    } else if (value === "&rsaquo;") {
      if (curentPage !== totalPages) setPage(curentPage + 1);
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPages);
    } else {
      setPage(value);
    }
  };
}

export const extractNames = (data, index) => {
  if (!data) {
    return [];
  }
  const namesArray = data.map((item) => item[index]);
  return namesArray;
};

const { format } = require("date-fns");

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return format(date, "dd-MM-yyyy");
};

export const deFormatDate = (dateString) => {
  const stringDate = String(dateString); // Chuyển đổi thành chuỗi

  const parts = stringDate.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const dateObject = new Date(year, month, day);
  return dateObject;
};

export function compareDates(date1, date2) {
  // Lấy ra các thành phần ngày, tháng, năm của date1 và date2
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  // So sánh theo thứ tự năm -> tháng -> ngày
  if (year1 < year2) {
    return 1; // date1 < date2
  } else if (year1 > year2) {
    return -1; // date1 > date2
  } else {
    // Cùng năm, so sánh tháng
    if (month1 < month2) {
      return 1; // date1 < date2
    } else if (month1 > month2) {
      return -1; // date1 > date2
    } else {
      // Cùng năm và tháng, so sánh ngày
      if (day1 < day2) {
        return 1; // date1 < date2
      } else if (day1 > day2) {
        return -1; // date1 > date2
      } else {
        return 0; // date1 = date2
      }
    }
  }
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
