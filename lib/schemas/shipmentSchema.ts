import z from "zod";

// Helper function to check if date is today or future
const isTodayOrFuture = (dateStr: string) => {
  const selectedDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  return selectedDate >= today;
};

// Optional: Check if time is valid (e.g., during business hours)
const isValidPickupTime = (timeStr: string) => {
  if (!timeStr) return false;
  const [hours, minutes] = timeStr.split(":").map(Number);
  const timeInMinutes = hours * 60 + minutes;

  // Example: Allow pickup between 8:00 AM (480 min) and 8:00 PM (1200 min)
  const minTime = 8 * 60; // 8:00 AM
  const maxTime = 20 * 60; // 8:00 PM

  return timeInMinutes >= minTime && timeInMinutes <= maxTime;
};

export const shipmentSchema = z.object({
  sender: z
    .object({
      fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters long")
        .max(100, "Full name must be less than 100 characters")
        .regex(
          /^[a-zA-Z\s'-]+$/,
          "Full name can only contain letters, spaces, hyphens, and apostrophes"
        ),
      email: z.email("Enter a valid email address"),
      country: z.string().min(1, "Country is required"),
      phoneNumber: z
        .string()
        .min(7, "Phone number is too short")
        .max(15, "Phone number is too long")
        .regex(/^\+?\d+$/, "Phone number must contain only digits"),
      stateOrCity: z.string().min(2, "State/City is required").max(100),
      address: z
        .string()
        .min(5, "Address is too short")
        .max(200, "Address is too long"),

      pickupAddressType: z.enum(
        ["home", "office", "dropOff"],
        "Select a pickup address type"
      ),

      pickupDate: z
        .string()
        .min(1, "Pickup date is required")
        .refine(isTodayOrFuture, "Pickup date must be today or a future date"),

      pickupTime: z
        .string()
        .min(1, "Pickup time is required")
        .refine(
          isValidPickupTime,
          "Pickup time must be between 8:00 AM and 8:00 PM"
        ),
    })
    .refine(
      (data) => {
        const { pickupDate, pickupTime } = data;
        const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
        const now = new Date();

        return pickupDateTime.getTime() > now.getTime();
      },
      {
        message: "Pickup date and time must be in the future",
        path: ["pickupTime", "pickupDate"], // Error shows on pickupTime field
      }
    ),
  receiver: z.object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters long")
      .max(100, "Full name must be less than 100 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Full name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    email: z.email("Enter a valid email address"),
    country: z.string().min(1, "Country is required"),
    phoneCountryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    stateOrCity: z.string().min(2, "State/City is required").max(100),
    address: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),
  }),
  shipment: z.object({}),
});

export type ShipmentFormType = z.infer<typeof shipmentSchema>;

export const defaultShipmentValues = {
  sender: {
    fullName: "",
    email: "",
    country: "",

    phoneNumber: "",
    stateOrCity: "",
    address: "",
    pickupAddressType: undefined,
    pickupDate: "",
    pickupTime: "",
  },
  receiver: {
    fullName: "",
    email: "",
    country: "",
    phoneCountryCode: "",
    phoneNumber: "",
    stateOrCity: "",
    address: "",
  },
};
