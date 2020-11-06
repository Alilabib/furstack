import createApiActions from "~helpers/createApiActions";
import { GET_CAREAR_LIST } from "./constants";

const getCarearList = (id, options = {}) =>
  createApiActions({
    type: GET_CAREAR_LIST,
    url: `/company/carear/${id}`,
    requestOption: {
      method: "get",
    },
    success: options.success,
    fail: options.fail,
  })(null, true);

export default getCarearList;
