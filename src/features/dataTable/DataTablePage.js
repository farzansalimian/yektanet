import React from 'react';
import handleDataChanges from './handleDataChanges';
import {
  getItemId,
  getItemDate,
  getItemField,
  getItemName,
  getItemNewValue,
  getItemOldValue,
  getItemTitle,
} from '../../utils/dataUtils';
import handleSearch from './handleSearch';
import handleSort from './handleSort';
import { ArrowIcon } from '../../assets/svgIcons';

function DataTablePage() {
  const {
    visibleItems,
    onPreviousPage,
    onNextPage,
    currentPage,
    onSearchKeyword,
    onSorByKey,
    sortBy,
    isDescending,
  } = handleDataChanges();

  const { onNameSearch, onDateSearch, onFieldSearch, onTitleSearch } = handleSearch(
    onSearchKeyword,
  );

  const { sorByName, sorByDate, sorByField, sorByTitle, sorByNewValue, sorByOldValue } = handleSort(
    onSorByKey,
  );

  return (
    <div>
      <button onClick={onPreviousPage}>قبلی</button>
      <button onClick={onNextPage}>بعدی</button>
      <button>{currentPage}</button>
      <input placeholder={'Name'} onChange={onNameSearch} />
      <input placeholder={'Date'} onChange={onDateSearch} />
      <input placeholder={'Field'} onChange={onFieldSearch} />
      <input placeholder={'Title'} onChange={onTitleSearch} />
      {sortBy}
      <div className={isDescending && 'rotate'}>
        <ArrowIcon />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={sorByName}>نام تغییر دهنده</th>
            <th onClick={sorByDate}>تاریخ</th>
            <th onClick={sorByTitle}>نام آگهی</th>
            <th onClick={sorByField}>فیلد</th>
            <th onClick={sorByOldValue}>مقدار قدیمی</th>
            <th onClick={sorByNewValue}>مقدار جدید</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item) => (
            <tr key={getItemId(item)}>
              <td>{getItemTitle(item)}</td>
              <td>{getItemDate(item)}</td>
              <td>{getItemName(item)}</td>
              <td>{getItemField(item)}</td>
              <td>{getItemNewValue(item)}</td>
              <td>{getItemOldValue(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTablePage;
