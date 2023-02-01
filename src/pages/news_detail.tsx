import { MainContext } from "contexts/main_context";
import { MainLayout } from "layouts/main_layout";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NewsDetail = (): React.ReactElement => {
  const { article } = useContext(MainContext);

  return (
    <MainLayout>
      <div className="article-detail">
        <Link to="/">Back to list</Link>
        {article && (
          <div>
            <h1>{article?.title}</h1>
            <img src={article?.urlToImage} alt="img_source" />
            <h3>{article?.description}</h3>
          </div>
        )}
        {article && <Link to="/">Back to list</Link>}
      </div>
    </MainLayout>
  );
};

export { NewsDetail };
