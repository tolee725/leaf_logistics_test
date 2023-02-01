import { getTopNews, pageSize } from "api/main";
import { NewsCard } from "components/news_card";
import { MainContext } from "contexts/main_context";
import { MainLayout } from "layouts/main_layout";
import { useContext, useMemo } from "react";
import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { Article, ArticleResponse } from "types/main";

const TopNews = () => {
  const { country } = useContext(MainContext);

  const loadData = useCallback(
    ({ pageParam = 1 }) => {
      return getTopNews({ page: pageParam, country });
    },
    [country]
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  } = useInfiniteQuery<ArticleResponse>(["news", country], loadData, {
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000, // update cache every 30 minutes
    getNextPageParam: (lastPage, pages) => {
      return pages.length < Math.ceil(lastPage.totalResults / pageSize)
        ? pages.length + 1
        : undefined;
    },
  });

  const totalItems = useMemo(() => {
    return data?.pages[0]?.totalResults || 0;
  }, [data]);

  const onLoadMore = () => {
    if (isFetchingNextPage) return;
    fetchNextPage();
  };

  if (status === "loading")
    return (
      <MainLayout>
        <div className="articles-view">Loading •••</div>
      </MainLayout>
    );

  if (error)
    return (
      <MainLayout>
        <div className="articles-view">Failed to fetch articles</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="articles-view">
        {data?.pages?.map((page: ArticleResponse) => {
          return page?.articles.map((article: Article) => {
            return <NewsCard article={article} key={article.title} />;
          });
        })}
        {hasNextPage && (
          <NewsCard
            isLoadMoreCard
            isLoadingMore={isFetchingNextPage}
            onLoadMore={onLoadMore}
          />
        )}
        {totalItems === 0 && <div> No articles </div>}
      </div>
    </MainLayout>
  );
};

export { TopNews };
