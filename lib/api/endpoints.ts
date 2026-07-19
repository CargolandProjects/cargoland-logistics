export const API_ROUTES = {
  auth: {
    register: "/users/register",
    verifyEmail: "/users/verify-email",
    resendOtp: "/users/resend-otp",
    login: "/users/login",
    refreshToken: "/users/refresh-token",
    requestPasswordReset: "/users/request-reset-password",
    updatePassword: "/users/update-password",
    getUserById: (id: string) => `/users/${id}`,
    updateProfile: "/users/update-profile",
    changePassword: "/users/change-password",
  },

  shipment: {
    trackShipment: "/shipments/shipment-tracking-id",
    createShipment: "/shipments/create-shipment",
    createShipmentUser: "/shipments/create-shipment-user",
    dashboardStats: "/shipments/dashboard-stats",
    allShipments: "/shipments/all-shipments",
    shipmentEstimate: "/shipments/estimation",
    myShipments: "/shipments/my-shipment",
    getShipmentById: (shipmentId: string) => `/shipments/${shipmentId}`,
    makePayment: (shipmentId: string) =>
      `/shipments/make-payment/${shipmentId}`,
    getShipmentByReference: (reference: string) =>
      `/shipments/get-shipment-by-reference/${reference}`,
    getShipmentInvoice: (reference: string) =>
      `/shipments/${reference}/invoice`,
  },

  image: {
    upload: "/upload",
    delete: (publicId: string) => `/upload/${publicId}`,
  },

  pricing: {
    getAllPricing: "/admin/pricing",
    getAllLocalPricing: "/admin/pricing/local-pricing",
  },

  location: {
    getPlaceDetails: (placeId: string) =>
      `https://places.googleapis.com/v1/places/${placeId}`,
    // `api/places/details?placeId=${placeId}`,
  },
  wallet: {
    fundWallet: "/users/fund-wallet",
    chargeWallet: "/users/charge-wallet",
    getBalance: "/users/get-wallet-balance",
  },
};
