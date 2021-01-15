import { sortCompare } from './sortUtils';

export const filterByBinarySearch = (items, searchTermParam, dataKey, isDescending) => {
  const searchTerm = searchTermParam.trim?.();
  let low = 0;
  let high = items.length - 1;
  let firstIndex = -1;

  // Find first occurrence
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    const midItemValue = items[mid][dataKey].trim?.();

    // Do normal or reverse binary search based on sort direction
    if (isDescending && midItemValue > searchTerm) high = mid - 1;
    else if (!isDescending && midItemValue < searchTerm) high = mid - 1;
    else if (isDescending && midItemValue < searchTerm) low = mid + 1;
    else if (!isDescending && midItemValue > searchTerm) low = mid + 1;
    // If items[mid] is same as searchTerm, update res and move to the left half
    else {
      firstIndex = mid;
      high = mid - 1;
    }
  }
  // If there is first occurrence, there are no match items for search
  if (firstIndex === -1) {
    return [];
  }

  low = 0;
  high = items.length - 1;
  let lastIndex = -1;
  // Find last occurrence
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    const midItemValue = items[mid][dataKey].trim?.();

    // Do normal or reverse binary search based on sort direction
    if (isDescending && midItemValue > searchTerm) high = mid - 1;
    else if (!isDescending && midItemValue < searchTerm) high = mid - 1;
    else if (isDescending && midItemValue < searchTerm) low = mid + 1;
    else if (!isDescending && midItemValue > searchTerm) low = mid + 1;
    // If items[mid] is same as searchTerm, update res and move to the right half
    else {
      lastIndex = mid;
      low = mid + 1;
    }
  }
  // If there is not last occurrence
  if (lastIndex === -1) {
    return [items[firstIndex]];
  }
  return items.slice(firstIndex, lastIndex + 1);
};

export const filterAndSortByKeywords = (items, keywordsFilter, sortBy, isDescending) => {
  // Filter data based on keywords
  const newItems = items.filter((item) => {
    for (const [keywordKey, keywordValue] of Object.entries(keywordsFilter)) {
      if (keywordValue && item[keywordKey]?.trim() !== keywordValue?.trim()) return false;
    }
    return true;
  });
  // Sort
  newItems.sort((a, b) => sortCompare(a, b, sortBy, isDescending));
  return newItems;
};
