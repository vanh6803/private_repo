import {
  FECTH_INVOICE_REQUEST,
  FECTH_INVOICE_SUCCESS,
  FECTH_INVOICE_FAILURE,
} from "../constants";

export const fetchInvoiceRequest = (token, status) => {
  return {
    type: FECTH_INVOICE_REQUEST,
    payload: { token, status },
  };
};

export const fetchInvoiceSuccess = (data) => {
  return {
    type: FECTH_INVOICE_SUCCESS,
    payload: data,
  };
};

export const fetchInvoiceFailure = (error) => {
  return {
    type: FECTH_INVOICE_FAILURE,
    payload: error,
  };
};
