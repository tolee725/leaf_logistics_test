import { getTopNews, pageSize } from "api/main";
import { NewsCard } from "components/news_card";
import { MainContext } from "contexts/main_context";
import { MainLayout } from "layouts/main_layout";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Article, ArticleResponse } from "types/main";

const newsSources = { us: "United States", gb: "Great Britain" };
const TopNews = () => {
  const location = useLocation();
  const { country } = useContext(MainContext);
  const [keyword, setKeyword] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const isSearchScreen = useMemo(() => {
    return location.pathname === "/search";
  }, [location]);

  useEffect(() => {
    if (!isSearchScreen) setKeyword("");
  }, [isSearchScreen]);

  const loadData = useCallback(
    ({ pageParam = 1 }) => {
      return getTopNews({ page: pageParam, country, keyword });
    },
    [country, keyword]
  );

  const { data, error, fetchNextPage, hasNextPage, status, isFetching } =
    useInfiniteQuery<ArticleResponse>(
      ["search_news", country, keyword],
      loadData,
      {
        refetchOnWindowFocus: false,
        staleTime: 30 * 60 * 1000, // update cache every 30 minutes
        getNextPageParam: (lastPage, pages) => {
          return pages.length < Math.ceil(lastPage.totalResults / pageSize)
            ? pages.length + 1
            : undefined;
        },
      }
    );

  const totalItems = useMemo(() => {
    return data?.pages[0]?.totalResults || 0;
  }, [data]);

  const onLoadMore = () => {
    if (isFetching) return;
    fetchNextPage();
  };

  const onSearch = useCallback(() => {
    setKeyword(searchRef?.current?.value || "");
  }, [searchRef]);

  const articleContent = () => {
    if (status === "loading") return <h5>Loading •••</h5>;
    if (error) return <h5>Failed to fetch articles</h5>;
    if (totalItems === 0) return <h5> No articles </h5>;

    return (
      <div className="articles-view">
        {data?.pages?.map((page: ArticleResponse) => {
          return page?.articles.map((article: Article) => {
            return <NewsCard article={article} key={article.title} />;
          });
        })}
        {hasNextPage && (
          <NewsCard
            isLoadMoreCard
            isLoadingMore={isFetching}
            onLoadMore={onLoadMore}
          />
        )}
      </div>
    );
  };

  const getSearchBox = () => {
    return (
      <div className="search-box">
        <input ref={searchRef} />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="top-news-view">
        {isSearchScreen ? (
          <h3 className="page-header">
            Search top news from {newsSources[country]}
          </h3>
        ) : (
          <h3 className="page-header">Top news from {newsSources[country]}</h3>
        )}
        {isSearchScreen && getSearchBox()}
        {articleContent()}
      </div>
    </MainLayout>
  );
};

export { TopNews };
