import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

const LIMIT = 6;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPages = useMemo(
    () => Math.ceil(totalProducts / LIMIT),
    [totalProducts]
  );

  const fetchProducts = useCallback(async () => {
    const controller = new AbortController();

    try {
      setLoading(true);
      setError("");

      const skip = (page - 1) * LIMIT;

      const res = await axios.get(
        `https://dummyjson.com/products`,
        {
          params: {
            limit: LIMIT,
            skip,
            select: "title,price,thumbnail",
          },
          signal: controller.signal,
        }
      );
    console.log(res)
      setProducts(res.data.products || []);
      setTotalProducts(res.data.total || 0);
    } catch (err) {
      // Ignore aborted request errors
      if (axios.isCancel(err)) return;

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };



  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Loading */}
      {loading && (
        <div className="text-lg font-medium">Loading products...</div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="border rounded-xl p-4 shadow-sm"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />

                <h2 className="font-semibold text-lg line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-gray-600 mt-1">
                  ${product.price}
                </p>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center mt-10 text-gray-500">
              No products found.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-4 py-2 border rounded-md transition ${
                      page === pageNumber
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Pagination;