import { useState, useEffect } from 'react';

export interface UseSearchResult {
    filteredData: any[];
    handleSearchChange: (text: string) => void;
}

const useSearch = (data: any[]): UseSearchResult => {
    const [filteredData, setFilteredData] = useState<any[]>(data);

    const handleSearchChange = (text: string): void => {
        const filtered = data.filter(item =>
            item.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return {
        filteredData,
        handleSearchChange,
    };
};

export default useSearch;
