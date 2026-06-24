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

export const packageType = [
  "Document",
  "Box",
  "Crate",
  "Pallet",
  "Parcel",
  "other",
] as const;

export const shipmentSchema = z
  .object({
    // Sender Details Starts Here
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters long")
      .max(100, "Full name must be less than 100 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Full name can only contain letters, spaces, hyphens, and apostrophes",
      ),
    email: z.email("Enter a valid email address"),
    country: z.string().min(1, "Country is required"),
    phoneNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\+?\d+$/, "Phone number must contain only digits"),
    stateOrCity: z.string().min(2, "State/City is required").max(100),
    postalCode: z.string().min(2, "Postal code is required").max(100),
    cityCode: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(500, "Description is too long")
      .optional()
      .or(z.literal("")),
    address: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),

    pickUpAddressType: z.enum(
      ["HOME", "OFFICE", "DROP_OFF"],
      "Select a pickup address type",
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
        "Pickup time must be between 8:00 AM and 8:00 PM",
      ),

    //  Receiver's Details Starts Here
    receiverName: z
      .string()
      .min(3, "Full name must be at least 3 characters long")
      .max(100, "Full name must be less than 100 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Full name can only contain letters, spaces, hyphens, and apostrophes",
      ),
    receiverEmail: z.email("Enter a valid email address"),
    receiverCountry: z.string().min(1, "Country is required"),
    receiverNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\+?\d+$/, "Phone number must contain only digits"),
    receiverStateOrCity: z.string().min(2, "State/City is required").max(100),
    receiverAddress: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),
    recieverPostalCode: z.string().min(2, "Postal code is required").max(100),
    recieverCityCode: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(500, "Description is too long")
      .optional()
      .or(z.literal("")),

    //  Package Details Starts Here
    packageType: z.enum(packageType, {
      error: "Please select a package type",
    }),

    numberOfItems: z
      .string("Number of items is required")
      .min(1, "Must be at least 1 item")
      .max(100, "Maximum 100 items")
      .regex(/^\d+$/, "Must be a positive whole number"),

    weight: z
      .string("Weight is required")
      .min(0.1, "Weight must be at least 0.1 kg")
      .max(10000, "Weight cannot exceed 10000 kg")
      .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

    length: z
      .string("Length is required")
      .min(1, "Length must be at least 1 cm")
      .max(500, "Length cannot exceed 500 cm")
      .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

    breadth: z
      .string("Breadth is required ")
      .min(1, "Breadth must be at least 1 cm")
      .max(500, "Breadth cannot exceed 500 cm")
      .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

    height: z
      .string("Height is required ")
      .min(1, "Height must be at least 1 cm")
      .max(500, "Height cannot exceed 500 cm")
      .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),

    imageUrl: z
      .array(
        z.object({
          imageUrl: z.string().url(),
          publicId: z.string(),
        }),
      )
      .optional()
      .default([]),

    descriptionOfGoods: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(500, "Description is too long")
      .optional()
      .or(z.literal("")),
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
    },
  );

export type ShipmentDataType = z.infer<typeof shipmentSchema>;

export const defaultShipmentValues = {
  // Sender Details
  fullName: "",
  email: "",
  country: "",
  phoneNumber: "",
  stateOrCity: "",
  postalCode: "",
  cityCode: "",
  address: "",
  pickUpAddressType: undefined,
  pickupDate: "",
  pickupTime: "",

  // Receiver Details
  receiverName: "",
  receiverEmail: "",
  receiverCountry: "",
  receiverNumber: "",
  receiverStateOrCity: "",
  receiverAddress: "",
  recieverCityCode: "",
  recieverPostalCode: "",

  // Package Details
  packageType: undefined,
  numberOfItems: "",
  weight: "",
  length: "",
  breadth: "",
  height: "",
  imageUrl: [],

  descriptionOfGoods: "",
};
