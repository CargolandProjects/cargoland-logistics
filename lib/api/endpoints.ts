export const API_ROUTES = {
  auth: {
    register: "/users/register",
    verifyEmail: "/users/verify-email",
    resendOtp: "/users/resend-otp",
    login: "/users/login",
    requestPasswordReset: "/users/request-reset-password",
    updatePassword: "/users/update-password",
    getUserById: (id: string) => `/users/${id}`,
  },

  shipment: {
    trackShipment: "/shipments/shipment-tracking-id",
  },
};
