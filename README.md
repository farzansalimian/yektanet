

# Yektanet project

Farzan Salimain

last updated in 15 Jan

## Project structure

This project is build based on feature folder pattern.

src/app/App.js -> Main entry.

------------------

src/assets -> Asset like icons are defined here.

----------------------------

src/components -> Custom components are defined here.

-------------------------------------

src/constants -> Constants are defined here.

---------------------------------

src/features/dataTable/data.json -> Initial data.
src/features/dataTable/DataTablePage.js -> Data table page.
src/features/dataTable/handleDataChanges.js -> Handling data changes like next page, load initial data ...
src/features/dataTable/handleSearch.js -> search keywords callbacks are definded here.
src/features/dataTable/handleSort.js -> sort callbacks are defined here.
src/features/dataTable/styles.css -> related styles are defined here.
src/features/dataTable/TableRow.js -> Table row component.
src/features/dataTable/TableColumn.js ->   Table column component.

---------------------------------

src/hooks -> Custom hooks are defined here.

--------------------------------

src/utils/dataUtils.js -> Data helper based on data structure
src/utils/eventUtils.js -> js event helper.
src/utils/filterUils.js -> Filter utilities like binary search
src/utils/sortUtils.js -> Sort utilities

-----------------------------------------

## Requiements:

Filter - sort - url : src/features/dataTable/handleDataChanges.js

BST: src/utils/filterUils-> filterByBinarySearch

Local storage saving : src/features/dataTable/TableRow.js

--------------------------------------



## How does it work?

Most app logic is defined in src/features/dataTable/handleDataChanges.js



Load initial filters based on search params in url.

```
line 13 - 58
useEffect(() => {
 		....
}, []);
```

This method save given filter in url`s search params.

```
const updateUrlSearchParams = (items) => {
  ...
};
```

Below methods are used for page changes.

```
const updatePage = (newPage) => {
 ...
};
// Go to next page if it is valid
const onNextPage = () => {
 ...
};
// Go to previous page if it is valid
const onPreviousPage = () => {
  ...
};
```



Filter & sort:

There are 3 different scenario for applying sort and filter:

1- Sort is based on **date ** and new date keywords has typed by user

In this case filterByBinarySearch function gets called which filter items base on binary search tree algorithm.

2- New keyword is added which did **not**  have value before

In this case it is better to filter current data since it could be way much smaller than initial data.

3- None of the above

Current items are not valid anymore and filtering should be perform on initial data.

This method use useDebounce hook for better performance.

```
// Filter and sort data base on its condition
const debouncedFilterAndSort = useDebounce(200, (keywordsFilter, key, value) => {
...
});
```



This method save new keywords within state and url and then call debouncedFilterAndSort.

```
const onSearchKeyword = (key, value) => {
  ...
};
```



Save sort value in state and perform sorting.

```
const onSorByKey = (sortBy) => {
  ...
};
```

Populate visible items based on current page and items per page.

```
// Populate visible items
const startIndex = (filters.page - 1) * itemsPerPage;
const endIndex = filters.page * itemsPerPage;
// Todo: check whether useMemo is better here
const visibleItems = allItems.slice(startIndex, endIndex);
```

Binary search tree : src/utils/filterUils.js

Find first and last occurrence of search term by performing BST algorithm. Sort direction is considered here to make it reusable for both sorting direction.



```
export const filterByBinarySearch = (items, searchTermParam, dataKey, isDescending) => {
...
};
```