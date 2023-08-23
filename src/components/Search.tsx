import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchProps } from "../types/general";

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="flex items-center bg-[#DFDFDF] rounded-md px-2 py-1 w-1/3">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
        className="w-full bg-transparent border-none focus:outline-none"
      />
    </div>
  );
}
