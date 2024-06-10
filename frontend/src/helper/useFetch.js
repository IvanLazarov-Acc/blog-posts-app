import { useEffect, useState } from "react";

const useDataFetch = (url, user) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        setData(json);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [url, user]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, isLoading, refetch };
};

export default useDataFetch;