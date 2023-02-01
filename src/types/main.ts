export enum CountryCode {
  US = "us",
  GB = "gb",
}

export type ArticleSource = {
  id: string;
  name: string;
};

export type Article = {
  source: ArticleSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

export enum ArticleResponseStatus {
  OK = "ok",
}

export type ArticleResponse = {
  status: ArticleResponseStatus;
  totalResults: number;
  articles: Article[];
};
