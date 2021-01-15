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
import Input from '../../components/input/Input';
import './styles.css';
import Button from '../../components/button/Button';
import TableTh from './TableTh';
import FILTER_KEYS from '../../constants/filterKeys';
import TableRow from './TableRow';
import FILTER_PLACE_HOLDERS from '../../constants/filterPlaceHolders';

function DataTablePage() {
  const {
    visibleItems,
    onPreviousPage,
    onNextPage,
    page,
    onSearchKeyword,
    onSorByKey,
    sortBy,
    isDescending,
    keywords,
  } = handleDataChanges();

  const { onNameSearch, onDateSearch, onFieldSearch, onTitleSearch } = handleSearch(
    onSearchKeyword,
  );

  const { sorByName, sorByDate, sorByField, sorByTitle, sorByNewValue, sorByOldValue } = handleSort(
    onSorByKey,
  );

  return (
    <div>
      <div className={'table-inputs-container'}>
        <Input
          value={keywords[FILTER_KEYS.name]}
          placeholder={FILTER_PLACE_HOLDERS.name}
          onChange={onNameSearch}
        />
        <Input
          value={keywords[FILTER_KEYS.date]}
          placeholder={FILTER_PLACE_HOLDERS.date}
          onChange={onDateSearch}
        />
        <Input
          value={keywords[FILTER_KEYS.field]}
          placeholder={FILTER_PLACE_HOLDERS.field}
          onChange={onFieldSearch}
        />
        <Input
          value={keywords[FILTER_KEYS.title]}
          placeholder={FILTER_PLACE_HOLDERS.title}
          onChange={onTitleSearch}
        />
      </div>

      <div className={'table-buttons-container'}>
        <Button onClick={onPreviousPage} text={'قبلی'} />
        <span className={'page-number'}>{page}</span>
        <Button onClick={onNextPage} text={'بعدی'} />
      </div>

      <div className={'table-container'}>
        <table className={'table'}>
          <thead>
            <tr>
              <TableTh
                hasSortIcon={sortBy === FILTER_KEYS.name}
                isDescending={isDescending}
                onClick={sorByName}
                text={FILTER_PLACE_HOLDERS.name}
              />
              <TableTh
                hasSortIcon={sortBy === FILTER_KEYS.date}
                isDescending={isDescending}
                onClick={sorByDate}
                text={FILTER_PLACE_HOLDERS.date}
              />
              <TableTh
                hasSortIcon={sortBy === FILTER_KEYS.title}
                isDescending={isDescending}
                onClick={sorByTitle}
                text={FILTER_PLACE_HOLDERS.title}
              />
              <TableTh
                hasSortIcon={sortBy === FILTER_KEYS.field}
                isDescending={isDescending}
                onClick={sorByField}
                text={FILTER_PLACE_HOLDERS.field}
              />
              <TableTh
                hasSortIcon={sortBy === FILTER_KEYS.oldValue}
                isDescending={isDescending}
                onClick={sorByOldValue}
                text={FILTER_PLACE_HOLDERS.old_value}
              />
              <TableTh
                hasSortIcon={sortBy === FILTER_KEYS.newValue}
                isDescending={isDescending}
                onClick={sorByNewValue}
                text={FILTER_PLACE_HOLDERS.new_value}
              />
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item) => (
              <TableRow
                key={getItemId(item)}
                title={getItemTitle(item)}
                name={getItemName(item)}
                id={getItemId(item)}
                date={getItemDate(item)}
                field={getItemField(item)}
                newValue={getItemNewValue(item)}
                oldValue={getItemOldValue(item)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTablePage;
