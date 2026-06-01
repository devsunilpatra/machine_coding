import { useRef, useCallback } from "react";

const Post = ({
  data,
  setPageNo,
  loading,
  hasMore,
}) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current =
        new IntersectionObserver(
          (entries) => {
            if (
              entries[0].isIntersecting &&
              hasMore
            ) {
              setPageNo((prev) => prev + 1);
            }
          },
          {
            threshold: 0.5,
            rootMargin: "200px",
          }
        );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, setPageNo]
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item, index) => {
        const isLast =
          index === data.length - 1;

        return (
          <img
            key={item.id}
            ref={isLast ? lastElementRef : null}
            src={`https://picsum.photos/id/${item.id}/500/300`}
            alt={`post-${item.id}`}
            loading="lazy"
            className="h-64 w-full rounded-xl object-cover"
          />
        );
      })}
    </div>
  );
};

export default Post;