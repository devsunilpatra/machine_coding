import { useState, useEffect, useRef, useCallback } from "react";
import Post from "./Post";

const LIMIT = 10;

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  // prevent duplicate requests
  const fetchingRef = useRef(false);

  console.log(fetchingRef.current, "fetchingRef")

  const fetchPosts = useCallback(async () => {
    if (fetchingRef.current || !hasMore) return;

    fetchingRef.current = true;
    setLoading(true);

    const controller = new AbortController();

    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=${LIMIT}`,
        {
          signal: controller.signal,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const newData = await res.json();

      // if api returns empty array
      if (newData.length === 0) {
        setHasMore(false);
      }

      setData((prev) => [...prev, ...newData]);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }

    return () => controller.abort();
  }, [pageNo, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex justify-center flex-col items-center py-3">
      <Post
        data={data}
        setPageNo={setPageNo}
        loading={loading}
        hasMore={hasMore}
      />

      {loading && (
        <p className="py-4 text-lg">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {!hasMore && (
        <p className="py-4">
          No more posts
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;