import countries, { LocaleData } from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

const localeData: LocaleData = en;

delete localeData.countries["AQ"];


countries.registerLocale(localeData);

const names = countries.getNames("en", { select: "official" });

export const countryOptions = Object.entries(names).map(([code, name]) => ({
  value: code,
  label: name,
}));
