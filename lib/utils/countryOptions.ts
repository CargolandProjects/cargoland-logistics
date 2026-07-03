import countries, { LocaleData } from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

const localeData: LocaleData = en;
countries.registerLocale(localeData);

// delete localeData.countries["AQ"];

const names = countries.getNames("en", { select: "official" });

export const countryOptions = Object.entries(names)
  .filter(([code]) => code !== "AQ")
  .map(([code, name]) => ({
    value: code,
    label: name,
  }));

const nigeriaStatesList = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Abuja",
];

export const nigeriaStates = nigeriaStatesList.map((state) => ({
  value: state,
  label: state,
}));
