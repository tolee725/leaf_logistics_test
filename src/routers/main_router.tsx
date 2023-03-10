import { Categories } from "pages/categories";
import { TopNews } from "pages/top_news";
import { createBrowserRouter } from "react-router-dom";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <TopNews />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/search",
    element: <TopNews />,
  },
]);

export { mainRouter };
