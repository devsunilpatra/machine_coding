import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const Search = () => {
  const [query, setQuery] =
    useState("");

  const debouncedQuery =
    useDebounce(query, 700);

  useEffect(() => {
    if (!debouncedQuery.trim())
      return;

    const fetchData = async () => {
      try {
        console.log(
          "API call:",
          debouncedQuery
        );

        // const res = await fetch(...)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Search Users
        </h1>

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search..."
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-gray-300
            outline-none
            focus:ring-2
            focus:ring-blue-500
            shadow-sm
          "
        />

        <p className="mt-4 text-gray-600">
          Typing: {query}
        </p>

        <p className="text-green-600">
          Debounced: {debouncedQuery}
        </p>
      </div>
    </div>
  );
};

export default Search;