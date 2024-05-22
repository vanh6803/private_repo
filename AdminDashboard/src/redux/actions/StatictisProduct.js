import {
  FECTH_STATICTIS_PRODUCT_REQUEST,
  FECTH_STATICTIS_PRODUCT_SUCCESS,
  FECTH_STATICTIS_PRODUCT_FAILURE,
} from "../constants";

export const fetchStatisticProductRequest = () => {
  return {
    type: FECTH_STATICTIS_PRODUCT_REQUEST,
  };
};

export const fetchStatisticProductSuccess = (data) => {
  return {
    type: FECTH_STATICTIS_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const fetchStatisticProductFail = (error) => {
  return {
    type: FECTH_STATICTIS_PRODUCT_FAILURE,
    payload: error,
  };
};
