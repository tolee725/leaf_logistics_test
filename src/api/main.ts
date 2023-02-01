import Axios from "axios";
import { ArticleResponse, CountryCode } from "types/main";

const API_URL = process.env.REACT_APP_NEWS_API_URL;
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
export const pageSize = 20;

/**
 * @param locale is the news source
 * @param page is the current page
 * @param keyword is the search keyword
 * @returns news array based on the params
 */
export const getTopNews = ({
  country = CountryCode.US,
  page = 1,
  keyword = "",
}): Promise<ArticleResponse> => {
  return new Promise<ArticleResponse>((resolve, reject) => {
    Axios.get(`${API_URL}`, {
      params: {
        country,
        pageSize,
        page,
        q: keyword,
        apiKey: API_KEY,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
