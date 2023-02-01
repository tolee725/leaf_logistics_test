import { createContext } from "react";
import { Article, CountryCode } from "types/main";

type MainContextType = {
  country: CountryCode;
  setCountry: React.Dispatch<React.SetStateAction<CountryCode>>;
  article?: Article | null | undefined;
  setArticle: React.Dispatch<React.SetStateAction<Article | null | undefined>>;
};

const MainContext = createContext<MainContextType>({
  country: CountryCode.US,
  setCountry: () => {},
  article: null,
  setArticle: () => {},
});

export { MainContext };
