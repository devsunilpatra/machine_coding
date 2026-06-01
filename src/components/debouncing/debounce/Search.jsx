import { useState } from "react";

import { useDebounce } from "./useDebounce";

const Search = () => {
    const [query, setQuery] = useState("");

    const debounced = useDebounce(query, 700);

    return (
        <div className="flex flex-col items-center justify-center">
            <input
                type="text"
                className="border"
                onChange={(e) => setQuery(e.target.value)}
            />

            <div>Input Text: {query}</div>
            <div>Debounced Text: {debounced}</div>
        </div>
    );
};

export default Search;
