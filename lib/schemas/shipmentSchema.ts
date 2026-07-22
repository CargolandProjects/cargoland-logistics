import z from "zod";

// Helper function to check if date is today or future
export const isTodayOrFuture = (dateStr: string) => {
  const selectedDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  return selectedDate >= today;
};

// Optional: Check if time is valid (e.g., during business hours)
export const isValidPickupTime = (timeStr: string) => {
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
    stateOrCity: z.string().optional(),
    fromState: z.string().optional(),
    fromCity: z.string().optional(),
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

    pickupDate: z.string().optional(),
    pickupTime: z.string().optional(),

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
    receiverStateOrCity: z.string().optional(),
    toWhereState: z.string().optional(),
    toWhereCity: z.string().optional(),
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
    shipmentType: z.enum(["DOMESTIC", "INTERNATIONAL"], {
      error: "Please select a shipment type",
    }),
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

    imageUrl: z.array(
      z.object({
        imageUrl: z.string().url(),
        publicId: z.string(),
      }),
    ),
    // .min(1, "At least one image is required")

    descriptionOfGoods: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(500, "Description is too long")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const { shipmentType, pickUpAddressType, pickupDate, pickupTime } = data;

    // ----- 1. Date/Time Future Validation -----
    if (pickupDate && pickupTime) {
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      const now = new Date();
      if (pickupDateTime.getTime() <= now.getTime()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Pickup date and time must be in the future",
          path: ["pickupTime"],
        });
      }
    }

    // ----- 2. Sender Location Validation -----
    if (shipmentType === "DOMESTIC") {
      if (!data.fromState || data.fromState.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Origin State is required",
          path: ["fromState"],
        });
      }
      if (!data.fromCity || data.fromCity.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Origin City is required",
          path: ["fromCity"],
        });
      }
    } else if (shipmentType === "INTERNATIONAL") {
      if (!data.stateOrCity || data.stateOrCity.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State/City is required",
          path: ["stateOrCity"],
        });
      }
    }

    // ----- 3. Receiver Location Validation -----
    if (shipmentType === "DOMESTIC") {
      if (!data.toWhereState || data.toWhereState.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Destination State is required",
          path: ["toWhereState"],
        });
      }
      if (!data.toWhereCity || data.toWhereCity.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Destination City is required",
          path: ["toWhereCity"],
        });
      }
    } else if (shipmentType === "INTERNATIONAL") {
      if (!data.receiverStateOrCity || data.receiverStateOrCity.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State/City is required",
          path: ["receiverStateOrCity"],
        });
      }
    }

    // ----- 4. Pickup Date/Time Requirements (conditional on address type) -----
    if (pickUpAddressType !== "DROP_OFF") {
      if (!pickupDate || pickupDate.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Pickup date is required",
          path: ["pickupDate"],
        });
      }
      if (!pickupTime || pickupTime.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Pickup time is required",
          path: ["pickupTime"],
        });
      }
    }
  });

export type ShipmentDataType = z.infer<typeof shipmentSchema>;

export const defaultShipmentValues = {
  // Sender Details
  fullName: "",
  email: "",
  country: "",
  phoneNumber: "",
  stateOrCity: "",
  fromState: "",
  fromCity: "",
  postalCode: "",
  cityCode: "",
  address: "",
  pickUpAddressType: "DROP_OFF" as const,
  pickupDate: "",
  pickupTime: "",

  // Receiver Details
  receiverName: "",
  receiverEmail: "",
  receiverCountry: "",
  receiverNumber: "",
  receiverStateOrCity: "",
  toWhereState: "",
  toWhereCity: "",
  receiverAddress: "",
  recieverCityCode: "",
  recieverPostalCode: "",

  // Package Details
  shipmentType: undefined,
  packageType: undefined,
  numberOfItems: "",
  weight: "",
  length: "",
  breadth: "",
  height: "",
  imageUrl: [],
  descriptionOfGoods: "",
};
