// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return ( <
        input className = 'searchbar'
        type = "text"
        placeholder = "Search by name/username"
        value = { searchTerm }
        onChange = { handleChange }
        />
    );
};

export default SearchBar;