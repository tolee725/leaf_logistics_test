import { CountryCode } from "types/main";

const getCountryCode = (key: keyof typeof CountryCode): CountryCode => {
  return CountryCode[key as keyof typeof CountryCode];
};

export { getCountryCode };
