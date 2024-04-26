import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchArticles = async (searchQuary, currentPage) => {

  const response = await axios.get("/search/photos?&client_id=j8oNvEEj84iXL-mo0MaCyTAd-odleL5rvpI7hMJY1bE",  {
      params: {
    orientation: 'squarish',
      query: searchQuary,
      per_page: 100,
      page: currentPage,
    },
  });
  return response.data.results;
};