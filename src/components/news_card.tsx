import classNames from "classnames";
import { MainContext } from "contexts/main_context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "types/main";

type NewsCardProps = {
  article?: Article;
  isLoadMoreCard?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

const NewsCard = ({
  article,
  isLoadMoreCard,
  isLoadingMore,
  onLoadMore,
}: NewsCardProps) => {
  const { setArticle } = useContext(MainContext);
  const navigate = useNavigate();

  const onViewDetail = () => {
    setArticle(article);
    navigate("/detail");
  };

  if (isLoadMoreCard)
    return (
      <div
        className={classNames("article-card", "load-more", {
          "is-loading-more": isLoadingMore,
        })}
        onClick={onLoadMore}
      >
        {isLoadingMore ? "Loading •••" : "Load More"}
      </div>
    );

  return (
    <div className="article-card" onClick={onViewDetail}>
      <div className={classNames("truncate-single", "article-title")}>
        {article?.title}
      </div>
      <img
        className="article-image"
        src={article?.urlToImage}
        alt="source_image"
      />
      <div className={classNames("truncate-three", "article-description")}>
        {article?.description}
      </div>
    </div>
  );
};

export { NewsCard };
