import { useEffect, useState } from 'react';
import initialData from './data';
import FILTER_KEYS from '../../constants/filterKeys';
import useDebounce from '../../hooks/useDebounce';
import { sortCompare } from '../../utils/sortUtils';
import { filterAndSortByKeywords, filterByBinarySearch } from '../../utils/filterUils';

function handleDataChanges({ itemsPerPage = 10 } = {}) {
  const [allItems, setAllItems] = useState(initialData);
  const maxPageCount = Math.ceil(allItems.length / itemsPerPage);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const initialFilters = {
      name: null,
      date: null,
      title: null,
      field: null,
      oldValue: null,
      newValue: null,
      page: 1,
      sortBy: FILTER_KEYS.date,
      isDescending: true,
    };
    // Get search params from url and apply filter
    let searchParams = new URLSearchParams(window.location.search);
    const validKeys = Object.values(FILTER_KEYS);
    // Todo: remove case sensitivity
    for (const [key, value] of searchParams) {
      // Validate sort direction
      if (key === FILTER_KEYS.isDescending) initialFilters[key] = value === 'true';
      else if (key === FILTER_KEYS.page) {
        // Validate page
        const page = Number.parseInt(value);
        if (Number.isInteger(page)) initialFilters[key] = page;
      } else if (validKeys.includes(key)) initialFilters[key] = value; // Other keys
    }

    const keywordsFilter = {
      name: initialFilters.name,
      date: initialFilters.date,
      title: initialFilters.title,
      field: initialFilters.field,
    };
    // If it is just date filter and sort is also by date
    if (
      initialFilters.sortBy === FILTER_KEYS.date &&
      initialFilters.date &&
      !keywordsFilter.name &&
      !keywordsFilter.field &&
      !keywordsFilter.title
    ) {
      setAllItems(filterByBinarySearch(allItems, value, FILTER_KEYS.date, filters.isDescending));
    } else {
      // Otherwise filter and sort based on initial data
      filterAndSortByKeywords(initialData, keywordsFilter);
      setFilters(initialFilters);
    }
  }, []);

  const updateUrlSearchParams = (items) => {
    // Add or delete filters in url`s search params
    const url = new URL(window.location);
    for (const { key, value } of items) {
      if (value.toString?.()) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url);
  };

  const updatePage = (newPage) => {
    setFilters({ ...filters, page: newPage });
    // Update url
    updateUrlSearchParams([{ value: newPage, key: FILTER_KEYS.page }]);
  };

  // Go to next page if it is valid
  const onNextPage = () => {
    if (filters.page < maxPageCount) {
      const newPage = filters.page + 1;
      updatePage(newPage);
    }
  };

  // Go to previous page if it is valid
  const onPreviousPage = () => {
    if (filters.page > 1) {
      const newPage = filters.page - 1;
      updatePage(newPage);
    }
  };

  // Filter and sort data base on its condition
  // Todo : implement binary search for other keys
  const debouncedFilterAndSort = useDebounce(200, (keywordsFilter, key, value) => {
    // If sort is by date and new added keyword is also date which did not have value before do binary search
    if (sortBy === FILTER_KEYS.date && key === FILTER_KEYS.date && !filters[key] && value) {
      setAllItems(filterByBinarySearch(allItems, value, FILTER_KEYS.date, filters.isDescending));
      return;
    }

    // If new added keyword has value which did not have before filter and sort based on current items
    if (!filters[key] && value) {
      setAllItems(
        filterAndSortByKeywords(allItems, keywordsFilter, filters.sortBy, filters.isDescending),
      );
      return;
    }

    // Otherwise filter and sort based on initial data
    setAllItems(
      filterAndSortByKeywords(initialData, keywordsFilter, filters.sortBy, filters.isDescending),
    );
  });

  const onSearchKeyword = (key, value) => {
    // Apply new keyword
    const keywordsFilter = {
      name: filters.name,
      date: filters.date,
      title: filters.title,
      field: filters.field,
      [key]: value,
    };

    // Save data and reset page value
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      ...keywordsFilter,
    }));

    // Update url
    updateUrlSearchParams([
      { value, key },
      { key: FILTER_KEYS.page, value: 1 },
    ]);

    // Debounce filter and sort for better performance
    debouncedFilterAndSort(keywordsFilter, key, value);
  };

  const onSorByKey = (sortBy) => {
    const hasSortByChanged = filters.sortBy === sortBy;
    // If sortBy has changed reset sort direction otherwise toggle it
    const isDescending = hasSortByChanged ? !filters.isDescending : true;

    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
      isDescending,
    }));

    // Update url
    updateUrlSearchParams([
      { value: sortBy, key: FILTER_KEYS.sortBy },
      { key: FILTER_KEYS.isDescending, value: isDescending },
    ]);

    // If sortBy has changed call sort func otherwise reverse the current array
    const newItems = [...allItems];
    if (hasSortByChanged) newItems.sort((a, b) => sortCompare(a, b, sortBy, isDescending));
    else newItems.reverse();
    setAllItems(newItems);
  };

  // Populate visible items
  const startIndex = (filters.page - 1) * itemsPerPage;
  const endIndex = filters.page * itemsPerPage;
  // Todo: check whether useMemo is better here
  const visibleItems = allItems.slice(startIndex, endIndex);

  const { page, sortBy, isDescending, ...keywords } = filters;
  return {
    visibleItems,
    onNextPage,
    onPreviousPage,
    page,
    sortBy,
    isDescending,
    keywords,
    onSearchKeyword,
    onSorByKey,
  };
}

export default handleDataChanges;
