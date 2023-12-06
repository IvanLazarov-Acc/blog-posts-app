/* eslint-disable react/prop-types */
import { useState } from "react";

export const SearchBar = ({ setSearch }) => {
    const [value, setValue] = useState("");

    return (
        <div className="input-wrapper">
            <input
                placeholder="Type to search..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className="search-button" onClick={() => setSearch(value)}>Search</button>
        </div>
    );
};