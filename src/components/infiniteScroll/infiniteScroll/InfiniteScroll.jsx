import { useState, useEffect, useRef, useCallback } from "react";

export default function InfiniteScroll() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();

    // Fetch data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`);

                const data = await res.json();

                setPosts((prev) => [...prev, ...data.posts]);

                if (data.posts.length < 10) {
                    setHasMore(false);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, [page]);

    // Observe last element
    const lastPostRef = useCallback(
        (node) => {
            if (loading) return;

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },{threshold: 0.5});


             console.log(node, "node")
            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, hasMore],
    );

    return (
        <div>
            <h2 className="pt-2 text-center uppercase">Infinite Scroll Posts</h2>

            {posts.map((post, index) => {
                const isLastPost = index === posts.length - 1;

                return (
                    <div
                        key={post.id}
                        ref={isLastPost ? lastPostRef : null}
                        className="m-2.5 border p-2.5"
                    >
                        {post.title}
                    </div>
                );
            })}

            {loading && <p>Loading...</p>}
            {!hasMore && <p className="text-center">No more posts</p>}
        </div>
    );
}
