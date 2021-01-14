import { useEffect, useState } from 'react';
import initialData from './data';
import FILTER_KEYS from '../../constants/filterKeys';
import useDebounce from '../../hooks/useDebounce';
import { sortCompare } from '../../utils/sortUtils';

function initFilters() {
  const keywords = { ...FILTER_KEYS };
  for (let key in keywords) {
    keywords[key] = null;
  }
  return { keywords, page: 1, sortBy: FILTER_KEYS.date, isDescending: true };
}

function handleDataChanges({ itemsPerPage = 10 } = {}) {
  const [allItems, setAllItems] = useState([]);
  const maxPageCount = initialData.length / itemsPerPage;
  const [filters, setFilters] = useState(initFilters());

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
      if (key in FILTER_KEYS) {
        console.log(key, value);
      }
    }
  }, []);

  useEffect(() => {
    const newItems = initialData.filter((item) => {
      for (const [filterKey, filterValue] of Object.entries(filters.keywords)) {
        if (filterValue && item[filterKey] !== filterValue) return false;
      }
      return true;
    });

    newItems.sort((a, b) => sortCompare(a, b, filters.sortBy, filters.isDescending));
    setAllItems(newItems);
  }, [filters.keywords, filters.sortBy, filters.isDescending]);

  const onNextPage = () => {
    if (filters.page < maxPageCount)
      setFilters((prevFilters) => ({ ...prevFilters, page: prevFilters.page + 1 }));
  };

  const onPreviousPage = () => {
    if (filters.page > 1)
      setFilters((prevFilters) => ({ ...prevFilters, page: prevFilters.page - 1 }));
  };

  const onSearchKeyword = useDebounce(300, (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      keywords: { ...prevFilters.keywords, [key]: value.trim?.() },
    }));
  });

  const onSorByKey = (sortBy) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
      isDescending: prevFilters.sortBy === sortBy ? !prevFilters.isDescending : true,
    }));
  };

  const startIndex = (filters.page - 1) * itemsPerPage;
  const endIndex = filters.page * itemsPerPage;
  const visibleItems = allItems.slice(startIndex, endIndex);

  return {
    visibleItems,
    onNextPage,
    onPreviousPage,
    currentPage: filters.page,
    onSearchKeyword,
    onSorByKey,
    sortBy: filters.sortBy,
    isDescending: filters.isDescending,
  };
}

export default handleDataChanges;
