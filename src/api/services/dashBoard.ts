import { PRODUCT, PRODUCT_SEARCH } from '../constants';
import { http } from './http';

class DashBoard {
  getDashBoardData(page: number, additionalParams: object = {}) {
    const limit = 10;
    const skip = Number(page * limit);
    const params = {
      limit,
      skip,
      ...additionalParams,
    };
    console.log(params, "params")

    return http.get(PRODUCT, params);
  }
  getDashBoardDataBySearch(keyword: string) {
    const params = {
      q: keyword,
    };
    console.log(params, "params");

    return http.get(PRODUCT_SEARCH, params);
  }
}

export default new DashBoard();
