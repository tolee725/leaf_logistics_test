import { NewsDetail } from "pages/news_detail";
import { TopNews } from "pages/top_news";
import { createBrowserRouter } from "react-router-dom";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <TopNews />,
  },
  {
    path: "/detail",
    element: <NewsDetail />,
  },
]);

export { mainRouter };
