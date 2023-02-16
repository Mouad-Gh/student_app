import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(api, query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, isHasMore] = useState(false);

  useEffect(() => {
      setList([]);
  },[query]);
  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`http://localhost:4000/api/${api}?name=${query}&page=${page}`);
      
      const {hasMore, data} = res.data;
      console.log(page,data)
      setList((prev) =>page===0 ? data : [ ...new Set([...prev, ...data]) ] );

      isHasMore(hasMore)
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [query, page, api]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);
  

  return { loading, error, list , hasMore, sendQuery };
}

export default useFetch;