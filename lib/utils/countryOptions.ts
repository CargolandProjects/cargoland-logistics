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
