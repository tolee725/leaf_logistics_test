import { MainContext } from "contexts/main_context";
import { useCallback, useContext } from "react";

const NewsDetail = (): React.ReactElement => {
  const { article, setArticle } = useContext(MainContext);
  const goBack = useCallback(() => {
    setArticle(null);
  }, []);

  return (
    <div className="article-detail">
      <div className="go-back" onClick={goBack}>
        Back to list
      </div>
      {article && (
        <div>
          <h1>{article?.title}</h1>
          <img src={article?.urlToImage} alt="img_source" />
          <h3>{article?.description}</h3>
        </div>
      )}
      {article && (
        <div className="go-back" onClick={goBack}>
          Back to list
        </div>
      )}
    </div>
  );
};

export { NewsDetail };
