import { MainContext } from "contexts/main_context";
import { RouterProvider } from "react-router-dom";
import { mainRouter } from "routers/main_router";
import { Article, CountryCode } from "types/main";
import "styles/main.scss";
import { useState } from "react";

function Main() {
  const [countryCode, setCountryCode] = useState<CountryCode>(CountryCode.US);
  const [selectedArticle, setSelectedArticle] = useState<
    Article | null | undefined
  >(null);

  return (
    <MainContext.Provider
      value={{
        country: countryCode,
        setCountry: setCountryCode,
        article: selectedArticle,
        setArticle: setSelectedArticle,
      }}
    >
      <RouterProvider router={mainRouter} />
    </MainContext.Provider>
  );
}

export default Main;
