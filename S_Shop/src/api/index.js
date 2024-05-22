export const BASE_URL = 'http://192.168.1.144:3000';

export const apiUrl = {
  login: `${BASE_URL}/api/login`,
  register: `${BASE_URL}/api/register`,
  loginWithGoogle: `${BASE_URL}/api/login-with-google`,
  logout: `${BASE_URL}/api/logout`,
  verify: `${BASE_URL}/api/verify`,
  resendCode: `${BASE_URL}/api/resend-code`,
  forgotPassword: `${BASE_URL}/api/forgot-password`,
  createNewPassword: `${BASE_URL}/api/create-new-password`,
  detailProfile: `${BASE_URL}/api/user/detail-profile`,
  editProfile: `${BASE_URL}/api/user/edit-profile`,
  changePassword: `${BASE_URL}/api/user/change-password`,
  resetPassword: `${BASE_URL}/api/detail-profile`,
  uploadAvatar: `${BASE_URL}/api/upload-avatar`,
  resetPassword: `${BASE_URL}/api/detail-profile`,
  banner: `${BASE_URL}/api/banner/get-list`,
  // product
  getAllProducts: `${BASE_URL}/api/products/all-product`,
  getProductsByCategory: `${BASE_URL}/api/products/all-product-by-category`,
  getTopProduct: `${BASE_URL}/api/products/top-product`,
  getSimilarProducts: `${BASE_URL}/api/products/similar-product`,
  detailProduct: `${BASE_URL}/api/products/detail-product`,
  //cart
  addToCart: `${BASE_URL}/api/cart/create-cart-item`,
  getCart: `${BASE_URL}/api/cart/all-cart-user`,
  updateCartItem: `${BASE_URL}/api/cart/update-quantity`,
  deleteCartItem: `${BASE_URL}/api/cart/delete-cart-item`,
};
